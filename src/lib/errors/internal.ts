import {APIError, HttpStatusCode} from './base';

export class Internal extends APIError {
  constructor(msg = 'Internal Server Error') {
    super(
      'Internal Server Error Exception',
      HttpStatusCode.INTERNAL_SERVER,
      true,
      msg
    );
  }
}
