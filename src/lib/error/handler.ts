import {logger, error} from '@lib';

export class ErrorHandler {
  public static async handleError(err: Error): Promise<void> {
    logger.error(
      'Error message from the centralized error-handling component',
      err
    );
    //Extends for more behavior like notifications via email, etc...
  }

  public static isTrustedError(err: Error) {
    if (err instanceof error.BaseError) {
      return err.isOperational;
    }
    return false;
  }
}
