import { Router } from 'express';
import authRoutes from './auth';
import taskRoutes from './task';
import userRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);

export default router; 