import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserModel } from '../models/user.model';

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authHeader.slice(7);
    req.user = verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const adminGuard = async (req: Request, res: Response, next: NextFunction) => {
  authGuard(req, res, async () => {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await UserModel.findById(req.user.sub);
      if (!user || user.role !== 'Admin') {
        return res.status(403).json({ message: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
};
