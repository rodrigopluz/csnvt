import { exclude } from './../../database/providers/users/Delete';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UsersProvider } from '../../database/providers/users';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  id?: number;
}

export const deleteValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const delet = async (
  req: Request<IParamProps>,
  res: Response,
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'id is required',
      },
    });
  }

  const result = await UsersProvider.exclude(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
