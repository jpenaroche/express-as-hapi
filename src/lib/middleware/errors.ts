import {error} from '@lib';
import {NextFunction, Request, Response} from 'express';
import {BaseError} from 'lib/error';

export default async (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  await error.ErrorHandler.handleError(err);

  if (!error.ErrorHandler.isTrustedError(err)) {
    return res
      .status(500)
      .send('Something got Wrong. Please contact tech support');
  }

  return res.status((err as BaseError).httpCode).json({
    error: (err as BaseError).httpCode,
    message: (err as BaseError).message,
  });
};
