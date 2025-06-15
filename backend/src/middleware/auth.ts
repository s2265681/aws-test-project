import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not set in environment variables');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayload {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1) 获取token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('请先登录', 401));
    }

    // 2) 验证token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      console.log('Decoded token:', decoded);

      // 3) 将用户信息添加到请求对象
      req.user = decoded;
      console.log('User set in request:', req.user);

      next();
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return next(new AppError('认证失败: ' + jwtError.message, 401));
    }
  } catch (error) {
    console.error('Auth error:', error);
    next(new AppError('认证失败', 401));
  }
}; 