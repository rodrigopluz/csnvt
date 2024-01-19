import { Knex } from '../../knex';
import { IShipowners } from '../../models';
import { ETableNames } from '../../ETableNames';

export const create = async (data: Omit<IShipowners, 'id'>) => {
  try {
    const result = await Knex(ETableNames.shipsowners)
      .insert({ ...data })
      .then(() => {
        return data;
      });

    if (typeof result === 'object') {
      return result;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Error to create register ship...');
  } catch (error) {
    console.error(error);
    return new Error('Error to create register ship');
  }
};
