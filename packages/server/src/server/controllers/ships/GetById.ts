import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { ShipsProvider } from '../../database/providers/ships';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  imo?: number;
}

export const getByIdValidation = validation(get => ({
  params: get<IParamProps>(
    yup.object().shape({
      imo: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getById = async (
  req: Request<IParamProps>,
  res: Response,
) => {
  if (!req.params.imo) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'id is required',
      },
    });
  }

  const result = await ShipsProvider.getById(req.params.imo);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
