import { Environment } from '@csnvt/environment';
import { Api } from '../axios-config';

import { IHistory } from '@csnvt/types';

type TShipsTotalCount = {
  data: IHistory[];
  totalCount: number;
};

const getByShipImo = async (
  ships_imo: number,
): Promise<IHistory | Error> => {
  try {
    const response = `/historical/${ships_imo}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error('Não foi possível carregar o histórico.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar o histórico.',
    );
  }
};

const getAll = async (
  ships_imo: number,
  page: number,
): Promise<TShipsTotalCount | Error> => {
  try {
    const response = `/historical/${ships_imo}?page=${page}&limit=${Environment.LINE_LIMIT}`;
    const { data, headers } = await Api.get(response);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']),
      };
    }

    return new Error(
      'Não foi possível carregar os historicos do navio...',
    );
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar os historicos do navio.',
    );
  }
};

const create = async (
  history: Omit<IHistory, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IHistory>(
      `${Environment.URL_BASE}/historical`,
      history,
    );

    if (data) {
      return data.id;
    }

    return new Error('Não foi possível criar o historico ...');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível criar o historico.',
    );
  }
};

const update = async (
  id: number,
  data: IHistory,
): Promise<number | Error> => {
  try {
    const response = `/historical/update/${id}`;
    await Api.put(response, data);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível atualizar o historico.',
    );
  }
};

export const HistoryService = {
  getByShipImo,
  getAll,
  create,
  update,
};
