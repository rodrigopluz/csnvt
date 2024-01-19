import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsProvider } from '../../database/providers/ships';
import { validation } from '@csnvt/middleware';

interface IQueryProps {
  page?: number;
  limit?: number;
  name?: string;
  imo?: number;
}

export const getByFilterValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      imo: yup.number().notRequired().default(0),
      name: yup.string().notRequired().default(''),
      page: yup
        .number()
        .integer()
        .notRequired()
        .moreThan(0)
        .default(1),
      limit: yup
        .number()
        .integer()
        .notRequired()
        .moreThan(0)
        .default(7),
    }),
  ),
}));

export const getByFilter = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response,
) => {
  const result = await ShipsProvider.getByFilter(
    req.query.imo,
    req.query.name,
    req.query.page || 1,
    req.query.limit || 7,
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  res.setHeader(
    'access-control-expose-headers',
    'X-Total-Count',
  );

  return res.status(StatusCodes.OK).json(result);
};
