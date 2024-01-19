import { ETableNames } from '../../ETableNames';
import { IHistoricals } from '../../models';
import { Knex } from '../../knex';

export const getByShipImo = async (
  ships_imo: number,
): Promise<IHistoricals[] | Error> => {
  try {
    const result = await Knex(ETableNames.historical)
      .select('*')
      .where({ ships_imo });

    if (!result) {
      return new Error('Ship imo not found');
    }

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
