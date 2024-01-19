import { Router } from 'express';

import { ensureAuthenticated } from '@csnvt/middleware';
import { UsersController } from './../controllers/users';
import { ShipsController } from './../controllers/ships';
import { HistoryController } from '../controllers/historical';
import { ShipsOwnerController } from '../controllers/ships-owner';
import { InformationsController } from './../controllers/informations';

const router = Router();

/*- Ships -*/
router.get(
  '/ships',
  ShipsController.getAllValidation,
  ShipsController.getAll,
);

router.get(
  '/ships/filter',
  ShipsController.getByFilterValidation,
  ShipsController.getByFilter,
);

router.get(
  '/ships/:imo',
  ShipsController.getByIdValidation,
  ShipsController.getById,
);

router.put(
  '/ships/update/:imo',
  ShipsController.updateValidation,
  ShipsController.updateShip,
);

router.post(
  '/ships',
  ShipsController.createValidation,
  ShipsController.create,
);

/*- ShipsOwner -*/
router.post(
  '/ships-owner',
  ShipsOwnerController.createValidation,
  ShipsOwnerController.create,
);

router.get(
  '/ships-owner/:ships_imo',
  ShipsOwnerController.getByShipImoValidation,
  ShipsOwnerController.getByShipImo,
);

router.put(
  '/ships-owner/update/:imo/:id',
  ShipsOwnerController.updateValidation,
  ShipsOwnerController.update,
);

router.delete(
  '/ships-owner/delete/:id',
  ShipsOwnerController.deleteValidation,
  ShipsOwnerController.delet,
);

/*- Historical -*/
router.get(
  '/historical/:ships_imo',
  HistoryController.getByIdValidation,
  HistoryController.getByShipImo,
);

router.post(
  '/historical',
  HistoryController.createValidation,
  HistoryController.create,
);

router.put(
  '/historical/update/:id',
  HistoryController.updateValidation,
  HistoryController.update,
);

/*- Informations -*/
router.get(
  '/information/:ships_imo',
  InformationsController.getByIdValidation,
  InformationsController.getByShipImo,
);

router.post(
  '/information',
  InformationsController.createValidation,
  InformationsController.create,
);

router.put(
  '/information/update/:id',
  InformationsController.updateValidation,
  InformationsController.update,
);

/*- Users -*/
router.get(
  '/users',
  UsersController.getAllValidation,
  UsersController.getAll,
);

router.get(
  '/users/filter',
  UsersController.getByFilterValidation,
  UsersController.getByFilter,
);

router.get(
  '/users/:id',
  UsersController.getByIdValidation,
  UsersController.getById,
);

router.put(
  '/users/:id',
  UsersController.updateValidation,
  UsersController.update,
);

router.post(
  '/users',
  UsersController.createValidation,
  UsersController.create,
);

router.delete(
  '/users/:id',
  UsersController.deleteValidation,
  UsersController.delet,
);

router.post(
  '/register',
  UsersController.signUpValidation,
  UsersController.signUp,
);

router.post(
  '/login',
  UsersController.signInValidation,
  UsersController.signIn,
);

export { router };
