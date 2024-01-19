import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const count = async (): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.ships)
      .select()
      .count<[{ count: number }]>('* as count');

    if (Number.isInteger(Number(count))) {
      return Number(count);
    }

    return new Error('Error to count ships');
  } catch (error) {
    console.error(error);
    return new Error('Error to count ships');
  }
};
