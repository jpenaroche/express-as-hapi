import express from 'express';
import {router} from '@lib';
import {tasks} from './routes';
import {IContext} from 'main';

export default (ctx: IContext) =>
  router.bind(express.Router(), ctx).addRoutes([tasks]).getRouter();
