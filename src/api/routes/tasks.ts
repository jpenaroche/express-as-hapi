import {router} from '@lib';
import handlers from '../handlers';
import {tasks as taskSchema} from '../schemas';

export const tasks: router.IRouterParameters = {
  prefix: '/tasks',
  routes: [
    {
      method: 'get',
      path: '/',
      handler: handlers.tasks.list,
    },
    {
      method: 'get',
      path: '/:id',
      handler: handlers.tasks.get,
      validator: taskSchema.rules.get,
    },
    {
      method: 'post',
      path: '/',
      handler: handlers.tasks.create,
      validator: taskSchema.rules.create,
    },
    {
      method: 'delete',
      path: '/:id',
      handler: handlers.tasks.del,
      validator: taskSchema.rules.delete,
    },
  ],
};
