// import * as delet from './Delete';
import * as update from './Update';
import * as create from './Create';
import * as getByShipImo from './GetByShipImo';

export const HistoricalProvider = {
  // ...delet,
  ...update,
  ...create,
  ...getByShipImo,
};
