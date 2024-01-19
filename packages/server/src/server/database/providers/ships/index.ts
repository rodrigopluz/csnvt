import * as getByFilter from './GetByFilter';
import * as updateShip from './UpdateShip';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';
import * as count from './Count';

export const ShipsProvider = {
  ...count,
  ...create,
  ...getAll,
  ...getById,
  ...updateShip,
  ...getByFilter,
};
