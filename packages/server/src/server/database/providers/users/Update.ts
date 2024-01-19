import { PasswordCrypto } from '@csnvt/services';
import { ETableNames } from '../../ETableNames';
import { IUsers } from '../../models/User';
import { Knex } from '../../knex';

export const update = async (
  id: number,
  user: Omit<IUsers, 'id'>,
): Promise<void | Error> => {
  try {
    if (user.password !== undefined) {
      const hashedPassword = await PasswordCrypto.hashPassword(
        user.password,
      );

      user.password = hashedPassword;
    }

    const result = await Knex(ETableNames.users)
      .update(user)
      .where('id', '=', id);

    if (result === 1) {
      return;
    }

    return new Error('Não foi possível atualizar o usuário.');
  } catch (error) {
    console.error(error);
    return new Error('Não foi possível atualizar o usuário.');
  }
};
