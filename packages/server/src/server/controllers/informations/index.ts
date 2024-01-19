// import * as delet from './Delete';
import * as update from './Update';
import * as create from './Create';
import * as getByShipImo from './GetByShipImo';

export const InformationsController = {
  // ...delet,
  ...update,
  ...create,
  ...getByShipImo,
};
