import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { AnySchema, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import Reference from 'yup/lib/Reference';
import { ValidateOptions } from 'yup/lib/types';

import { AppError } from '@shared/errors/AppError';

export interface IObjectValidation {
  body?: AnySchema | Reference;
  params?: AnySchema | Reference;
  header?: AnySchema | Reference;
  query?: AnySchema | Reference;
}

export function validateRequest<C = object>(
  objectValidation: IObjectValidation,
  validateOptions: ValidateOptions<C>
) {
  return async function middleware(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { body, params, header, query } = request;
      const value = { body, params, header, query };

      const schema = yup.object().shape(objectValidation as ObjectShape);
      await schema.validate(value, validateOptions);
      next();
    } catch (error) {
      const validationError = new ValidationError(error as ValidationError);

      console.error('ValidationError', validationError);

      throw AppError.ofYupError(validationError);
    }
  };
}
