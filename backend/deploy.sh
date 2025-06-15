#!/bin/bash

# 设置错误时退出
set -e

echo "开始部署..."

# 确保在正确的目录
cd /var/www/app/backend

# 加载环境变量 本地node环境 不需要， 生产环境部署脚本是 shell 脚本， 需要加载环境变量
echo "加载环境变量..."
set -a
source .env
set +a

# 检查 MySQL 服务是否运行
echo "检查 MySQL 服务..."
if ! sudo systemctl is-active --quiet mysql; then
    echo "启动 MySQL 服务..."
    sudo systemctl start mysql
fi

# 等待 MySQL 完全启动
echo "等待 MySQL 启动..."
sleep 5

# 检查数据库是否存在
echo "检查数据库..."
if ! sudo mysql -u root -p"$DB_PASSWORD" -e "USE aws_test" &> /dev/null; then
    echo "创建数据库..."
    sudo mysql -u root -p"$DB_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS aws_test;
GRANT ALL PRIVILEGES ON aws_test.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
EOF
fi

# 安装依赖
echo "安装依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

# 复制生产环境配置
echo "复制环境配置文件..."
cp .env.production dist/.env

# 检查 PM2 是否已经运行
if pm2 list | grep -q "aws-test-backend"; then
    echo "重启 PM2 服务..."
    pm2 restart aws-test-backend
else
    echo "启动 PM2 服务..."
    pm2 start dist/index.js --name aws-test-backend
fi

# 保存 PM2 配置
echo "保存 PM2 配置..."
pm2 save

echo "部署完成！"
echo "使用 'pm2 logs aws-test-backend' 查看日志"
echo "使用 'pm2 status' 查看服务状态" 