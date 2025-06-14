#!/bin/bash

# AWS 部署脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 打印带颜色的消息
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 未安装"
        exit 1
    fi
}

# 检查必要的工具
check_command aws
check_command npm
check_command node

# 设置 SSH key 路径
SSH_KEY_PATH="~/.ssh/deploy_key"
if [ -f "$SSH_KEY_PATH" ]; then
    SSH_KEY_OPTION="-i $SSH_KEY_PATH"
else
    SSH_KEY_OPTION="-i /Users/mac/Github/aws-project-key2.pem"
fi

# 构建前端
print_message "开始构建前端..."
cd frontend
npm install
npm run build
if [ $? -ne 0 ]; then
    print_error "前端构建失败"
    exit 1
fi

# 构建后端
print_message "开始构建后端..."
cd backend
npm install
npm run build
if [ $? -ne 0 ]; then
    print_error "后端构建失败"
    exit 1
fi

# 部署到 S3
print_message "开始部署前端到 S3... EC2"
scp $SSH_KEY_OPTION -r frontend/dist/* ubuntu@18.141.179.222:/var/www/app/frontend/dist

# 部署到 EC2
print_message "开始部署后端到 EC2..."
scp $SSH_KEY_OPTION -r backend/dist/* ubuntu@18.141.179.222:/var/www/app/backend

# 重启后端服务
print_message "重启后端服务..."
ssh $SSH_KEY_OPTION ubuntu@18.141.179.222 "cd /var/www/app/backend && pm2 start ecosystem.config.js"

print_message "部署完成！" 