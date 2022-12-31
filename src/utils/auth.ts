import {
  FusionAuthClient,
  LoginResponse,
  PasswordlessStartResponse,
  UserResponse,
} from '@fusionauth/typescript-client';

class Auth {
  client: FusionAuthClient;

  constructor() {
    const {
      REACT_APP_FUSION_API_KEY,
      REACT_APP_FUSION_ADDRESS,
    } = process.env;

    this.client = new FusionAuthClient(
      REACT_APP_FUSION_API_KEY || '',
      REACT_APP_FUSION_ADDRESS || '',
    );
  }

  async sendMagicLink(email: string): Promise<PasswordlessStartResponse> {
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
        response_type: 'code',
      },
    }).then((resp) => resp.response)
      .catch(() => {
        throw new Error(`Немагчыма знайсці карыстальніка з поштай '${email}'`);
      });

    if (codeResp) {
      await this.client.sendPasswordlessCode({
        code: codeResp.code,
        applicationId: REACT_APP_FUSION_CLIENT_ID,
      })
        .then((resp) => resp.response)
        .catch(() => {
          throw new Error('Немагчыма адправіць пароль на ўказаны адрас электроннай пошты');
        });
    }

    return codeResp;
  }

  async getAccessToken(code: string): Promise<LoginResponse> {
    const {
      REACT_APP_FUSION_CLIENT_ID,
    } = process.env;

    let error: any;
    const acceesToken = await this.client.passwordlessLogin({
      code,
      applicationId: REACT_APP_FUSION_CLIENT_ID,
    })
      .then((resp) => resp.response)
      .catch((reason) => {
        switch (reason.statusCode) {
          case 404:
            error = 'Карыстальнік не быў знойдзены або пароль не верны';
            break;
          case 410:
            error = 'Тэрмін дзеяння карыстальніка скончыўся';
            break;
          case 423:
            error = 'Карыстальнік заблакаваны';
            break;
          default:
            error = 'Невядомая памылка';
            break;
        }
        throw new Error(error);
      });

    return acceesToken;
  }

  async getUserData(access_token: string): Promise<UserResponse> {
    const userInfo = await this.client.retrieveUserUsingJWT(access_token)
      .then((resp) => resp.response)
      .catch(() => {
        throw new Error('Няма валіднага токену');
      });

    return userInfo;
  }
}

export default Auth;
