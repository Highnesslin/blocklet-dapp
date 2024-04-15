import { ErrorRequestHandler } from 'express';
import logger from '../libs/logger';

const errorMiddleware: ErrorRequestHandler = (err, _req, res) => {
  // eslint-disable-next-line no-console
  console.log('err, _req, res');

  logger.error(err.stack);
  res.status(500).json({
    code: 500,
    data: err,
    msg: 'server error',
  });
};

export default errorMiddleware;
