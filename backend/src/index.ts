import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './middleware/logger';
import authRoutes from './routes/auth';
import taskRoutes from './routes/task';
import healthRoutes from './routes/health';
import userRoutes from './routes/users';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// 中间件
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
}); 