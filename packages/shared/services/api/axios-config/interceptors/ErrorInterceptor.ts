import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response?.status === 401) {
    // Do something
    return Promise.reject(new Error('Unauthorized.'));
  } else if (error.response?.status === 403) {
    // Do something
    return Promise.reject(new Error('Forbidden.'));
  } else if (error.response?.status === 404) {
    // Do something
    return Promise.reject(new Error('Not found.'));
  } else if (error.response?.status === 500) {
    // Do something
    return Promise.reject(new Error('Internal server error.'));
  }

  return Promise.reject(error);
};
