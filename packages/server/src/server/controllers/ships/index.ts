import * as getByFilter from './GetByFilter';
import * as updateShip from './UpdateShip';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';

export const ShipsController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateShip,
  ...getByFilter,
};
