import * as create from './Create';
import * as update from './Update';
import * as delet from './Delete';
import * as getByShipImo from './GetByShipImo';

export const ShipsOwnerController = {
  ...create,
  ...update,
  ...delet,
  ...getByShipImo,
};
