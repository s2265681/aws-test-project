import dotenv from 'dotenv';
// 确保在最开始就加载环境变量
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import { protect } from './middleware/auth';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import healthRoutes from './routes/health';
import userRoutes from './routes/users';

// 检查必要的环境变量
const requiredEnvVars = ['JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars.join(', '));
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// 基础中间件
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 认证中间件
app.use('/api/tasks', protect);
app.use('/api/users', protect);

// 日志中间件
app.use(logger);

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);
}); 