import {APIError, HttpStatusCode} from './base';

export class NotFoundError extends APIError {
  constructor(msg = 'Not found') {
    super('Not Found Exception', HttpStatusCode.NOT_FOUND, true, msg);
  }
}
