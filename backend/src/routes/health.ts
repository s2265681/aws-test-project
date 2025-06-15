import express from 'express';
import { db } from '../database/index';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // 检查数据库连接
    await db.selectFrom('users').select('id').limit(1).execute();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        server: 'running'
      }
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected',
        server: 'running'
      },
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 