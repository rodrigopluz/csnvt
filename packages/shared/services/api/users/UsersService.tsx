import { Environment } from '@csnvt/environment';
import { Api } from '../axios-config';

export interface IFormData {
  name?: string;
  email?: string;
  perfil?: string;
  status?: string;
  password?: string;
}

export interface IListUser {
  id: number;
  name: string;
  email: string;
  perfil: number;
  status: number;
  password?: string;
}

export interface IDetailUser {
  id: number;
  name: string;
  email: string;
  password: string;
  perfil: number;
  status: number;
}

type TUsersTotalCount = {
  data: IListUser[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = '',
): Promise<TUsersTotalCount | Error> => {
  try {
    const response = `/users?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`;
    const { data, headers } = await Api.get(response);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']),
      };
    }

    return new Error('Não foi possível carregar os usuários.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar os usuários.',
    );
  }
};

const getByName = async (
  name: string,
  page: number,
): Promise<IListUser[] | Error> => {
  try {
    const response = `/users/filter?_page=${page}&filter=${name}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error('Não foi possível carregar os usuários.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar os usuários.',
    );
  }
};

const getById = async (
  id: number,
): Promise<IDetailUser | Error> => {
  try {
    const response = `/users/${id}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error('Não foi possível carregar o usuário.');
  } catch (error) {
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar o usuário.',
    );
  }
};

const create = async (
  datas: Omit<IDetailUser, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetailUser>(
      `${Environment.URL_BASE}/users`,
      datas,
    );

    if (data) {
      return data.id;
    }

    return new Error('Não foi possível criar o usuário.');
  } catch (error) {
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível criar o usuário.',
    );
  }
};

const updateById = async (
  id: number,
  datas: IListUser,
): Promise<number | Error> => {
  try {
    const response = `/users/${id}`;
    const { data } = await Api.put(response, datas);

    if (data) {
      return data.id;
    }
  } catch (error) {
    return new Error('Não foi possível atualizar o usuário.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`${Environment.URL_BASE}/users/${id}`);
  } catch (error) {
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível deletar o usuário.',
    );
  }
};

export const UsersService = {
  create,
  getAll,
  getById,
  getByName,
  updateById,
  deleteById,
};
