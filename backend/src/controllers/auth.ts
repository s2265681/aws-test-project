import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user';
import { AppError } from '../middleware/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const signToken = (user: { id: number; username: string }): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn']
  };
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username 
    }, 
    JWT_SECRET, 
    options
  );
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // 检查邮箱是否已存在
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return next(new AppError('该邮箱已被注册', 400));
    }

    // 创建新用户
    const user = await UserModel.create({
      username,
      email,
      password
    });

    // 生成 token
    const token = signToken({ id: user.id as number, username: user.username });

    // 移除密码
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    // 检查用户是否存在
    const user = await UserModel.findByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      return next(new AppError('邮箱或密码错误', 400));
    }

    // 验证密码
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log('Password correct:', isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      return next(new AppError('邮箱或密码错误', 400));
    }

    // 生成 token
    const token = signToken({ id: user.id as number, username: user.username });
    console.log('Token generated:', token);

    // 移除密码
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return next(new AppError('用户不存在', 404));
    }

    // 移除密码
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      status: 'success',
      data: {
        user: userWithoutPassword
      }
    });
  } catch (error) {
    next(error);
  }
}; 