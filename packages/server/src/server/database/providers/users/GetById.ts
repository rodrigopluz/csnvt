import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models';
import { Knex } from '../../knex';

export const getById = async (
  id: number,
): Promise<IUsers | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .select('*')
      .where({ id })
      .first();

    if (!result) {
      return new Error('User not found');
    }

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
