import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserModel } from '../models/user.model';

export const lastActiveMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7);
      const decoded = verifyToken(token);
      if (decoded && decoded.sub) {
        UserModel.findByIdAndUpdate(decoded.sub, { lastActive: new Date() })
          .catch((error) => {
            console.error('Failed to update lastActive for user:', decoded.sub, error);
          });
      }
    } catch {
      // Silent error as authentication guards will handle unauthorized requests
    }
  }
  next();
};
