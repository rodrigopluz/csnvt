import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models';
import { Knex } from '../../knex';

const getByFilter = async (
  page: number,
  limit: number,
  filter: string,
): Promise<IUsers[] | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .select('*')
      .where('name', `${filter}`)
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
