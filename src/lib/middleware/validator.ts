import {NextFunction, Request, Response} from 'express';
import {AnySchema, ObjectSchema, ValidationOptions} from 'joi';
import {BadRequest} from '../error';

export type IRequestSchema = ObjectSchema<{
  body?: AnySchema;
  params?: AnySchema;
  query?: AnySchema;
}>;

export type TValidation = {
  name: string;
  schema: IRequestSchema;
  options?: ValidationOptions & {sanitize: boolean};
};

export const bind =
  ({schema, name, options}: TValidation) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.validate(req, {
      ...(options || {}),
      ...{
        allowUnknown: true,
      },
    });
    if (result.error) {
      next(
        new BadRequest(
          `Validation for ${name.toUpperCase()} Schema. Error details:  ${result.error.details
            .map(({message}) => message)
            .toString()}`
        )
      );
    }

    next();
  };
