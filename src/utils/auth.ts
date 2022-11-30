import {
  FusionAuthClient,
  UserResponse,
  LoginResponse,
  PasswordlessStartResponse
} from '@fusionauth/typescript-client';

export class Auth {
  client: FusionAuthClient;
  
  constructor() {
    const {
      REACT_APP_FUSION_API_KEY,
      REACT_APP_FUSION_ADDRESS,
    } = process.env;
    
    this.client = new FusionAuthClient(
      REACT_APP_FUSION_API_KEY || '',
      REACT_APP_FUSION_ADDRESS || ''
    );
  }

  async sendMagicLink(email: string): Promise<[PasswordlessStartResponse | null, any]> {
    const {
      REACT_APP_FUSION_CLIENT_ID,
      REACT_APP_FUSION_REDIRECTED_URI,
    } = process.env;

    let error: any;
    const codeResp = await this.client.startPasswordlessLogin({
      applicationId: REACT_APP_FUSION_CLIENT_ID,
      loginId: email,
      state: {
        redirect_uri: REACT_APP_FUSION_REDIRECTED_URI,
        client_id: REACT_APP_FUSION_CLIENT_ID,
        response_type: "code",
      },
    }).then(resp => resp.response)
      .catch((_) => {
        error = `User with email ${email} not found`;
        return null
      })

    if (codeResp) {
      await this.client.sendPasswordlessCode({
        code: codeResp.code,
        applicationId: REACT_APP_FUSION_CLIENT_ID,
      })
      .then(resp => resp.response)
      .catch((_) => {
        error = `Cannot send passcode to the provided email`;
      });
    }
    
    return [codeResp, error]
  }

  async getAccessToken(code: string): Promise<[LoginResponse | null, any]>{
    const {
      REACT_APP_FUSION_CLIENT_ID,
    } = process.env;

    let error: any;
    const acceesToken = await this.client.passwordlessLogin({
      code,
      applicationId: REACT_APP_FUSION_CLIENT_ID
    })
      .then(resp => resp.response)
      .catch((reason) => {
        switch (reason.statusCode) {
          case 404:
            error = "The user was not found or the password was incorrect";
            break;
          case 410:
            error = "The user has expired";
            break;
          case 423:
            error = "The user is locked and cannot login";
            break;
        }
        return null;
      })
    
    return [acceesToken, error];
  }

  async getUserData(access_token: string): Promise<[UserResponse | null, any]> {
    let error: any;
    const userInfo = await this.client.retrieveUserUsingJWT(access_token)
      .then(resp => resp.response)
      .catch((_) => {
        error = "Not valid access token";
        return null
      });

    return [userInfo, error];
  }
}