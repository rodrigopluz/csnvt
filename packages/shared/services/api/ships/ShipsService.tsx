import { Environment } from '@csnvt/environment';
import { IShipsProps } from '@csnvt/types';
import { Api } from '../axios-config';

type TShipsTotalCount = {
  data: IShipsProps[];
  totalCount: number;
};

const getAll = async (
  page: number,
): Promise<TShipsTotalCount | Error> => {
  try {
    const response = `/ships?page=${page}&limit=${Environment.LINE_LIMIT}`;
    const { data, headers } = await Api.get(response);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count']),
      };
    }

    return new Error('Não foi possível carregar os navios.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar os navios.',
    );
  }
};

const getByFilter = async (
  imo: number,
  ship: string,
  page: number,
): Promise<IShipsProps[] | Error> => {
  try {
    const response = `/ships/filter?imo=${imo}&name=${ship}&page=${page}&limit=${Environment.LINE_LIMIT}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error(
      `Não foi possível carregar o navio ${ship}.`,
    );
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        `Não foi possível carregar o navio ${ship}.`,
    );
  }
};

const getEditById = async (
  imo: number,
): Promise<IShipsProps | Error> => {
  try {
    const response = `/ships/${imo}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error('Não foi possível carregar o navio.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar o navio.',
    );
  }
};

const updateById = async (
  imo: number,
  data: IShipsProps,
): Promise<number | Error> => {
  try {
    const response = `/ships/update/${imo}`;
    await Api.put(response, data);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível atualizar o navio.',
    );
  }
};

const create = async (
  datas: Omit<IShipsProps, 'imo'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IShipsProps>(
      `${Environment.URL_BASE}/ships`,
      datas,
    );

    if (data) {
      return data.imo;
    }

    return new Error('Não foi possível criar o navio ...');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível criar o navio.',
    );
  }
};

export const ShipsService = {
  create,
  getAll,
  updateById,
  getEditById,
  getByFilter,
};
