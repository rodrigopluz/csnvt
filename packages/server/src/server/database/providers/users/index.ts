import * as getByEmail from './GetByEmail';
import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as count from './Count';
import * as update from './Update';
import * as exclude from './Delete';
import * as getByFilter from './GetByFilter';

export const UsersProvider = {
  ...getByEmail,
  ...create,
  ...getAll,
  ...getById,
  ...count,
  ...update,
  ...exclude,
  ...getByFilter,
};
