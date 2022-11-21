import { FusionAuthClient, UserResponse, LoginResponse } from '@fusionauth/typescript-client';

export class Auth {
  client: FusionAuthClient;
  
  constructor() {
    const {
      REACT_APP_FUSION_API_KEY,
      REACT_APP_FUSION_ADDRESS,
    } = process.env;
    
    this.client = new FusionAuthClient(REACT_APP_FUSION_API_KEY || '', REACT_APP_FUSION_ADDRESS || '');
  }

  async sendMagicLink(email: string): Promise<void> {
    const {
      REACT_APP_FUSION_CLIENT_ID,
      REACT_APP_FUSION_REDIRECTED_URI,
    } = process.env;

    const codeResp = await this.client.startPasswordlessLogin({
      applicationId: REACT_APP_FUSION_CLIENT_ID,
      loginId: email,
      state: {
        redirect_uri: REACT_APP_FUSION_REDIRECTED_URI,
        client_id: REACT_APP_FUSION_CLIENT_ID,
        response_type: "code",
      },
    })

    await this.client.sendPasswordlessCode({
      code: codeResp.response.code,
      applicationId: REACT_APP_FUSION_CLIENT_ID,
    })
  }

  async getAccessToken(code: string): Promise<LoginResponse | null>{
    const {
      REACT_APP_FUSION_CLIENT_ID,
    } = process.env;

    const acceesToken = await this.client.passwordlessLogin({
      code,
      applicationId: REACT_APP_FUSION_CLIENT_ID
    })
      .then(resp => resp.response)
      .catch(_ => null)
    
    return acceesToken;
  }

  async getUserData(access_token: string): Promise<UserResponse | null> {
    const userInfo = await this.client.retrieveUserUsingJWT(access_token)
      .then(resp => resp.response)
      .catch(_ => null);

    return userInfo;
  }
}