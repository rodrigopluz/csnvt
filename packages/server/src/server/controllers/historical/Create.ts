import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { HistoricalProvider } from '../../database/providers/historical';
import { IHistoricals } from '../../database/models/Historical';
import { validation } from '@csnvt/middleware';

interface IBodyProps
  extends Omit<IHistoricals, 'id' | 'ships_imo'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      historic: yup.string().required(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await HistoricalProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
