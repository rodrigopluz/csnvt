import { Knex } from '../../knex';
import { IInformations } from '../../models';
import { ETableNames } from '../../ETableNames';

export const update = async (
  id: number,
  data: Omit<IInformations, 'id'>,
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.informations)
      .update({ ...data })
      .where('id', id);

    if (result === 1) {
      return;
    }

    return new Error('ships-imo not updated error ...');
  } catch (error) {
    console.error(error);
    return new Error('ships-imo not updated error');
  }
};
