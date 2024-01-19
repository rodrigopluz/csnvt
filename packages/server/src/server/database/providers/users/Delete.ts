import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const exclude = async (
  id: number,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.users)
      .where('id', '=', id)
      .del();

    if (result === 0) {
      return;
    }

    return new Error('User not deleted');
  } catch (error) {
    console.error(error);
    return new Error('User not deleted');
  }
};
