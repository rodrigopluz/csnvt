import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { IUsers } from './../../database/models/User';
import { validation } from '@csnvt/middleware';

interface IBodyProps
  extends Omit<IUsers, 'id' | 'perfil' | 'status'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().email().required(),
      password: yup.string().required(),
      perfil: yup.string().required(),
      status: yup.string().required(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
