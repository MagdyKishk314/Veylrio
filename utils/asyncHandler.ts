import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wrap an async route handler so rejected promises are forwarded to Express's
 * error-handling middleware instead of crashing the process.
 */
type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => unknown;

export default function asyncHandler(fn: AsyncRouteHandler): RequestHandler {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
