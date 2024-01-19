import { Api } from '../axios-config';

interface IAuth {
  accessToken: string;
}

const auth = async (
  email: string,
  password: string,
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.post('/auth', {
      data: { email, password },
    });
    if (data) {
      return data;
    }

    return new Error('No data');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Error not login',
    );
  }
};

export const AuthService = { auth };
