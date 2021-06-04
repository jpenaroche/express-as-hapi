import {middleware} from '@lib';
export * as tasks from './tasks';

export type IRouteValidationSchema = {
  [k: string]: middleware.validator.TValidation;
};
