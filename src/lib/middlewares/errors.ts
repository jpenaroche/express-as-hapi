import {errors} from '@lib';
import {NextFunction, Request, Response} from 'express';
import {BaseError} from 'lib/errors';

export default async (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  await errors.ErrorHandler.handleError(err);

  if (!errors.ErrorHandler.isTrustedError(err)) {
    return res
      .status(500)
      .send('Something got Wrong. Please contact tech support');
  }

  return res.status((err as BaseError).httpCode).json({
    error: (err as BaseError).httpCode,
    message: (err as BaseError).message,
  });
};
