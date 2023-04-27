import type { Request, Response, NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  if (req.headers.cookie) {
    return next();
  }
  return res.status(401).send('Cookie not exist');
}
