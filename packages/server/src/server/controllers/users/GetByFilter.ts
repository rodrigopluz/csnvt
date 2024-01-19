import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '@csnvt/middleware';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getByFilterValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      filter: yup.string().notRequired().default(''),
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
  const result = await UsersProvider.getByFilter(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter,
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
