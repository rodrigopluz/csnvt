import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsOwnerProvider } from '../../database/providers/ships-owner';
import { IShipowners } from './../../database/models/Shipowner';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  imo?: number;
  id?: number;
}

interface IBodyProps
  extends Omit<IShipowners, 'id' | 'ships_imo'> {}

export const updateValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      imo: yup.number().integer().required().moreThan(0),
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().email().required(),
      phone: yup.string().required(),
    }),
  ),
}));

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response,
) => {
  if (!req.params.imo) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: `ships-imo is required ${StatusCodes.BAD_REQUEST}`,
      },
    });
  }

  const result = await ShipsOwnerProvider.update(
    req.params.imo,
    req.params.id,
    req.body,
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
