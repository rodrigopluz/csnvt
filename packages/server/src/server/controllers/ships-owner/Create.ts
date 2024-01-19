import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsOwnerProvider } from '../../database/providers/ships-owner';
import { IShipowners } from '../../database/models/Shipowner';
import { validation } from '@csnvt/middleware';

interface IBodyProps
  extends Omit<IShipowners, 'id' | 'ships_imo'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
      ships_imo: yup.string().notRequired(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await ShipsOwnerProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
