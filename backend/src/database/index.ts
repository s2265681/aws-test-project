import { Kysely, MysqlDialect } from 'kysely';
import { createPool } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// 数据库类型定义
interface Database {
  users: {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
  };
  tasks: {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'completed';
    user_id: number;
    created_at: Date;
    updated_at: Date;
  };
}

// 创建数据库连接
const dialect = new MysqlDialect({
  pool: createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'aws_test',
  })
});

// 创建数据库实例
export const db = new Kysely<Database>({
  dialect,
}); 