import {Request, Response} from 'express';

export default async (
  request: Request,
  response: Response
): Promise<Response> => {
  return response.send('tmp');
};
