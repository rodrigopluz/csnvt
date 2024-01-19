import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsProvider } from '../../database/providers/ships';
import { IShips } from './../../database/models/Ship';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  imo?: number;
}

interface IBodyProps extends Omit<IShips, 'imo'> {}

export const updateValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      imo: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      link: yup.string().notRequired(),
    }),
  ),
}));

export const updateShip = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response,
) => {
  if (!req.params.imo) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'imo is required',
      },
    });
  }

  const result = await ShipsProvider.updateShip(
    req.params.imo,
    req.body,
  );

  if (result === undefined) {
    return res.status(StatusCodes.OK).json({
      data: result,
    });
  } else if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }
};
