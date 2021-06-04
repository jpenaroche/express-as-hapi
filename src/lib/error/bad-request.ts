import {APIError, HttpStatusCode} from './base';

export class BadRequest extends APIError {
  constructor(msg = 'Bad Request') {
    super('Bad Request Exception', HttpStatusCode.BAD_REQUEST, true, msg);
  }
}
