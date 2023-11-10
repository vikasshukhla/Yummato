import {
  Request as ExRequest,
  Response as ExResponse,
  NextFunction,
} from 'express';
import { ValidateError } from 'tsoa';
import { ApplicationError } from '../models/error.model';

export const handleApplicationError = (
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(400).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  if (err instanceof ApplicationError) {
    return res.status(err.errorCode).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
};
