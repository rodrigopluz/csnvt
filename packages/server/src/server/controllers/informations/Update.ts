import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { InformationsProvider } from '../../database/providers/informations';
import { IInformations } from './../../database/models/Information';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IInformations, 'id'> {}

export const updateValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    }),
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      info: yup.string().required().min(3),
      datainfo: yup.string().required().min(3),
      ships_imo: yup.number().integer().required().moreThan(0),
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
        default: `historical is required ${StatusCodes.BAD_REQUEST}`,
      },
    });
  }

  const result = await InformationsProvider.update(
    req.params.id,
    req.body,
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
