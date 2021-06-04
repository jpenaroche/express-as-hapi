import express, {Express} from 'express';
import {common} from '@config';
import api from './api';
import {logger, middleware} from '@lib';
import {json, urlencoded} from 'body-parser';
import {IContext} from 'main';

export const register = (ctx: IContext): Express => {
  const app = express();
  // parse application/x-www-form-urlencoded
  app.use(urlencoded({extended: false}));
  // parse application/json
  app.use(json());
  // register static routes
  app.use('/static', express.static('static'));
  // register entire api
  app.use('/api', api(ctx));
  // register logging
  app.use(middleware.morgan);
  // register global error handler
  app.use(middleware.error);

  return app;
};

export const run = (ctx: IContext) => {
  const {port, host} = common;

  const localPort = Number(port || 3000);
  const localhost = host ?? 'localhost';

  //Register all applications and launch server
  register(ctx).listen(localPort, localhost, () => {
    logger.info(`Listening through port: ${localPort}`);
  });
};
