import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const exclude = async (
  id: number,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.shipsowners)
      .del()
      .where('id', id);

    if (result === 0) {
      return;
    }

    return new Error('ships-owner not deleted ...');
  } catch (error) {
    console.error(error);
    return new Error('ships-owner not deleted');
  }
};
