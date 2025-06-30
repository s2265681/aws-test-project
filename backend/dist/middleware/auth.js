"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = require("./errorHandler");
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not set in environment variables');
    process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;
const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return next(new errorHandler_1.AppError('请先登录', 401));
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            console.log('Decoded token:', decoded);
            req.user = decoded;
            console.log('User set in request:', req.user);
            next();
        }
        catch (jwtError) {
            console.error('JWT verification error:', jwtError);
            return next(new errorHandler_1.AppError('认证失败: ' + jwtError.message, 401));
        }
    }
    catch (error) {
        console.error('Auth error:', error);
        next(new errorHandler_1.AppError('认证失败', 401));
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map