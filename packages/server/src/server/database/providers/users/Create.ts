import { PasswordCrypto } from '@csnvt/services';
import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models';
import { Knex } from '../../knex';

export const create = async (
  user: Omit<IUsers, 'id'>,
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(
      user.password,
    );
    const [result] = await Knex(ETableNames.users)
      .insert({
        ...user,
        password: hashedPassword,
      })
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error to create register user...');
  } catch (error) {
    console.error(error);
    return new Error('Error to create register user');
  }
};
