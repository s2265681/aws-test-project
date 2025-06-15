import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // 获取用户名，如果用户未登录则显示 "未登录用户"
  const username = req.user?.username || '未登录用户';
  const id = req.user?.id || '';
  console.log('Request user:', req.user);
  
  // 请求日志
  console.log(`[${new Date().toISOString()}] ${id} ${username} ${req.method} ${req.url}`);
  
  // 响应日志
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${id} ${username}${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}; 