import { Environment } from '@csnvt/environment';
import { Api } from '../axios-config';

import { IShipsOwner } from '@csnvt/types';

const getByShipImo = async (
  ships_imo: number,
): Promise<IShipsOwner | Error> => {
  try {
    const response = `/ships-owner/${ships_imo}`;
    const { data } = await Api.get(response);

    if (data) {
      return data;
    }

    return new Error('Não foi possível carregar o armador.');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível carregar o armador.',
    );
  }
};

const create = async (
  datas: Omit<IShipsOwner, 'id'>,
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IShipsOwner>(
      `${Environment.URL_BASE}/ships-owner`,
      datas,
    );

    if (data) {
      return data.id;
    }

    return new Error('Não foi possível criar o armador ...');
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível criar o armador.',
    );
  }
};

const updateById = async (
  imo: number,
  id: number,
  data: IShipsOwner,
): Promise<number | Error> => {
  try {
    const response = `/ships-owner/update/${imo}/${id}`;
    await Api.put(response, data);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível atualizar o navio.',
    );
  }
};

const deleteById = async (
  id: number,
): Promise<number | Error> => {
  try {
    const response = `/ships-owner/delete/${id}`;
    await Api.delete(response);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        'Não foi possível deletar o armador.',
    );
  }
};

export const ShipsOwnersService = {
  create,
  updateById,
  deleteById,
  getByShipImo,
};
