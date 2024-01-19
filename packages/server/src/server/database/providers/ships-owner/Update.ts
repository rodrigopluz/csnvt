import { Knex } from '../../knex';
import { IShipowners } from '../../models';
import { ETableNames } from '../../ETableNames';

export const update = async (
  imo: number,
  id: number,
  data: Omit<IShipowners, 'id'>,
): Promise<void | Error> => {
  try {
    if (Number(imo) === data.ships_imo) {
      const result = await Knex(ETableNames.shipsowners)
        .update({ ...data })
        .where('id', id);

      if (result === 1) {
        return;
      }

      return new Error('ships-imo not updated error ...');
    }
  } catch (error) {
    console.error(error);
    return new Error('ships-imo not updated error');
  }
};
