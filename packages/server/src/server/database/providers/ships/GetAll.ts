import { ETableNames } from '../../ETableNames';
import { IShips } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (
  page: number,
  limit: number,
): Promise<IShips[] | Error> => {
  try {
    const result = await Knex(ETableNames.ships)
      .select('*')
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.error(error);
    return new Error('Error to get ships');
  }
};
