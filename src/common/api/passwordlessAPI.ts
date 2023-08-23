import apiInstance from './axiosConfig';

const PasswordlessAPI = {
  start: async (email: string) => {
    const response = await apiInstance.request({
      url: 'passwordless/start',
      method: 'POST',
      data: { email },
    }).catch((reason) => {
      let error: any;
      switch (reason.statusCode) {
        // TODO: Добавить статус-коды
        case 404:
          error = `Немагчыма знайсці карыстальніка з поштай - ${email}`;
          break;
        default:
          error = 'Невядомая памылка';
          break;
      }
      throw new Error(error);
    });

    return response;
  },
  login: async (code: string) => {
    const response = await apiInstance.request({
      url: 'passwordless/login',
      method: 'POST',
      data: { code },
    }).then(
      (result) => result.data.token,
    );

    return response;
  },
};

export default PasswordlessAPI;
