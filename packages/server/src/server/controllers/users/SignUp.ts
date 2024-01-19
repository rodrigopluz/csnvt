import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '@csnvt/middleware';
import { IUsers } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';

interface IProps
  extends Omit<IUsers, 'id' | 'perfil' | 'status'> {}

export const signUpValidation = validation(getSchema => ({
  body: getSchema<IProps>(
    yup.object().shape({
      name: yup.string().required(),
      password: yup.string().required(),
      email: yup.string().email().required(),
    }),
  ),
}));

export const signUp = async (
  req: Request<{}, {}, IProps>,
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
