import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models';
import { Knex } from '../../knex';

const getByEmail = async (
  email: string,
): Promise<IUsers | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .select('*')
      .where('email', '=', email)
      .andWhere('status', '=', 1)
      .first();

    if (result) return result;

    return new Error('Register not found');
  } catch (error) {
    console.error(error);
    return new Error('Error when querying the registry');
  }
};

export { getByEmail };
