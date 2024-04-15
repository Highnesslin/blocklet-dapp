import { RequestHandler } from 'express';

const authMiddle: RequestHandler = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ code: 'forbidden', error: 'not allowed' });
  }
  return next();
};

export default authMiddle;
