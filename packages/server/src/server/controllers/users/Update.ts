import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { IUsers } from './../../database/models/User';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  id?: number;
}

interface IBodyProps
  extends Omit<
    IUsers,
    'id' | 'password' | 'perfil' | 'status'
  > {}

export const updateValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().email(),
    }),
  ),
}));

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'id is required',
      },
    });
  }

  const result = await UsersProvider.update(
    req.params.id,
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
