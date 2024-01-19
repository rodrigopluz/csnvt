import { ETableNames } from '../../ETableNames';
import { IInformations } from '../../models';
import { Knex } from '../../knex';

export const getByShipImo = async (
  ships_imo: number,
): Promise<IInformations[] | Error> => {
  try {
    const result = await Knex(ETableNames.informations)
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
