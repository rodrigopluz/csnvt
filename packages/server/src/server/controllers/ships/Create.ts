import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsProvider } from '../../database/providers/ships';
import { IShips } from './../../database/models/Ship';
import { validation } from '@csnvt/middleware';

interface IBodyProps extends Omit<IShips, ''> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      imo: yup.number().required(),
      name: yup.string().required(),
      email: yup.string().notRequired(),
      phone: yup.string().notRequired(),
      link: yup.string().notRequired(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await ShipsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
