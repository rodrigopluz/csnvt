import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IUsers[] | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .select('*')
      .where('name', 'like', `%${filter}%`)
      .orWhere('email', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (error) {
    console.error(error);
    return new Error('Error to get users');
  }
};
