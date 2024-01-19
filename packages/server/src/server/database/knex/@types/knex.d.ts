import {
  IUsers,
  IShips,
  IShipowners,
  IHistoricals,
  IInformations,
} from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    users: IUsers;
    ships: IShips;
    history: IHistoricals;
    shipowners: IShipowners;
    informations: IInformations;
  }
}
