import { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const JSONParserError = (
  error: any,
  _: any,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof SyntaxError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'Format sent is incorrect',
      },
    });
  } else {
    next();
  }
};
