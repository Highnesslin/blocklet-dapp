import { RequestHandler } from 'express';

const responseMiddleware: RequestHandler = (_, res, next) => {
  // 重写 res.send 方法
  const originalSend = res.send;
  res.success = function (data) {
    // 统一处理响应体
    const responseData = {
      code: 200,
      msg: 'success',
      data,
    };
    originalSend.call(this, responseData);
  };
  next();
};

export default responseMiddleware;
