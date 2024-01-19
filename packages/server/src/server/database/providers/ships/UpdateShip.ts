import { ETableNames } from '../../ETableNames';
import { IShips } from '../../models/Ship';
import { Knex } from '../../knex';

export const updateShip = async (
  imo: number,
  ship: Omit<IShips, 'imo'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.ships)
      .update(ship)
      .where('imo', '=', imo);

    if (result === 1) {
      return;
    }

    return new Error('Ship not updated error ...');
  } catch (error) {
    console.error(error);
    return new Error('Ship not updated error ...');
  }
};
