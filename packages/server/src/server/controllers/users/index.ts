import * as signIn from './SignIn';
import * as signUp from './SignUp';
import * as getAll from './GetAll';
import * as update from './Update';
import * as create from './Create';
import * as delet from './Delete';
import * as getById from './GetById';
import * as getByFilter from './GetByFilter';

export const UsersController = {
  ...signIn,
  ...signUp,
  ...getAll,
  ...update,
  ...create,
  ...delet,
  ...getById,
  ...getByFilter,
};
