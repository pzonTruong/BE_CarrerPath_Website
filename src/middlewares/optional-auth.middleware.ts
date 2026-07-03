import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next();
  }

  try {
    const token = authHeader.slice(7);
    req.user = verifyToken(token);
  } catch {
    req.user = undefined;
  }

  return next();
};
