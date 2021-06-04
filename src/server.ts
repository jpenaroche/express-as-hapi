import express, {Express} from 'express';
import {common} from '@config';
import api from './api';
import {middleware} from '@lib';
import {json, urlencoded} from 'body-parser';
import {IContext} from 'main';

const register = (app: Express, ctx: IContext): Express => {
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
  const app = express();

  const localPort = Number(port || 3000);
  const localhost = host ?? 'localhost';

  //Register all applications and launch server
  register(app, ctx).listen(localPort, localhost, () => {
    console.log(`Listening through port: ${localPort}`);
  });
};
