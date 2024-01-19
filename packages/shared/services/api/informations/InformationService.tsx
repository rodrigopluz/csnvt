import { Environment } from '@csnvt/environment';
import { Api } from '../axios-config';

import { IInformations } from '@csnvt/types';

type TShipsTotalCount = {
  data: IInformations[];
  totalCount: number;
};

const getByShipImo = async (
  ships_imo: number,
): Promise<IInformations | Error> => {
  try {
    const response = `/information/${ships_imo}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error(
      'Não foi possível carregar as informações.',
    );
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar as informações.',
    );
  }
};

const getAll = async (
  ships_imo: number,
  page: number,
): Promise<TShipsTotalCount | Error> => {
  try {
    const response = `/information/${ships_imo}?page=${page}&limit=${Environment.LINE_LIMIT}`;
    const { data, headers } = await Api.get(response);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']),
      };
    }

    return new Error(
      'Não foi possível carregar as informações do navio...',
    );
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar as informações do navio.',
    );
  }
};

const create = async (
  history: Omit<IInformations, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IInformations>(
      `${Environment.URL_BASE}/information`,
      history,
    );

    if (data) {
      return data.id;
    }

    return new Error('Não foi possível criar a informação ...');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível criar a informação.',
    );
  }
};

const update = async (
  id: number,
  data: IInformations,
): Promise<number | Error> => {
  try {
    const response = `/information/update/${id}`;
    await Api.put(response, data);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível atualizar a informação.',
    );
  }
};

export const InformationService = {
  getByShipImo,
  getAll,
  create,
  update,
};
