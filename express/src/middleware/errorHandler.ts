import type { Request, Response } from 'express';
import type ErrorResponse from '../interfaces/ErrorResponse';
import log from '../utils/logger';

export default function errorHandler(err: Error, _: Request, res: Response<ErrorResponse>) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  log('warn', 'error-handler', err.message);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
