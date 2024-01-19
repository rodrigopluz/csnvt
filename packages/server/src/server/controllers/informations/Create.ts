import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { InformationsProvider } from '../../database/providers/informations';
import { IInformations } from '../../database/models/Information';
import { validation } from '@csnvt/middleware';

interface IBodyProps
  extends Omit<IInformations, 'id' | 'ships_imo'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      info: yup.string().required(),
      datainfo: yup.string().required(),
    }),
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response,
) => {
  const result = InformationsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
