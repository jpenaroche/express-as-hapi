import Joi from 'joi';
import {IRouteValidationSchema} from '.';
import {ITask} from '../services';

export const payloadTaskSchema = Joi.object<ITask>({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  when: Joi.date().iso().required(),
}).required();

export const rules: IRouteValidationSchema = {
  get: {
    name: 'Get Task',
    schema: Joi.object({
      params: Joi.object({
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
    }),
  },
  delete: {
    name: 'Delete Task',
    schema: Joi.object({
      params: Joi.object({
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
    }),
  },
  create: {
    name: 'Create Task',
    schema: Joi.object({
      body: Joi.object({
        task: payloadTaskSchema,
      }),
    }),
  },
  update: {
    name: 'Update Task',
    schema: Joi.object({
      params: Joi.object({
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
      body: Joi.object({
        task: payloadTaskSchema,
      }),
    }),
  },
  upload: {
    name: 'Update Task',
    schema: Joi.object({
      body: Joi.object({
        file: Joi.any(),
      }),
    }),
  },
  list: {
    name: 'List Tasks',
    schema: Joi.object({
      query: Joi.object({
        name: Joi.string().required(),
      }),
      params: Joi.object({
        id: Joi.number().required(),
      }),
    }),
  },
};
