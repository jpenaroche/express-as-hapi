import {logger, errors} from '@lib';

export class ErrorHandler {
  public static async handleError(err: Error): Promise<void> {
    logger.error(
      'Error message from the centralized error-handling component',
      err
    );
    //Extends for more behavior like notifications via email, etc...
  }

  public static isTrustedError(error: Error) {
    if (error instanceof errors.BaseError) {
      return error.isOperational;
    }
    return false;
  }
}
