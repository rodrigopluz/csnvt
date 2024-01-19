import { ETableNames } from '../../ETableNames';
import { IShips } from '../../models';
import { Knex } from '../../knex';

export const getById = async (
  imo: number,
): Promise<IShips | Error> => {
  try {
    const result = await Knex(ETableNames.ships)
      .select('*')
      .where({ imo })
      .first();

    if (!result) {
      return new Error('Ship not found');
    }

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
