import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { HistoricalProvider } from '../../database/providers/historical';
import { validation } from '@csnvt/middleware';

interface IParamProps {
  ships_imo?: number;
}

export const getByIdValidation = validation(get => ({
  params: get<IParamProps>(
    yup.object().shape({
      ships_imo: yup.number().integer().required().moreThan(0),
    }),
  ),
}));

export const getByShipImo = async (
  req: Request<IParamProps>,
  res: Response,
) => {
  if (!req.params.ships_imo) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'ship imo is required',
      },
    });
  }

  const result = await HistoricalProvider.getByShipImo(
    req.params.ships_imo,
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
