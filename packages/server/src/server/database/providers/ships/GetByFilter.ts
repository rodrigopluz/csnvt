import { ETableNames } from '../../ETableNames';
import { IShips } from '../../models';
import { Knex } from '../../knex';

const getByFilter = async (
  imo: number,
  name: string,
  page: number,
  limit: number,
): Promise<IShips[] | Error> => {
  try {
    const result = await Knex(ETableNames.ships)
      .select('*')
      .where('name', `${name}`)
      .orWhere('imo', `${imo}`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (result) return result;

    return new Error('Register not found');
  } catch (error) {
    console.error(error);
    return new Error('Error when querying the registry');
  }
};

export { getByFilter };
