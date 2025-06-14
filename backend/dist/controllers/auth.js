"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../models/user");
const errorHandler_1 = require("../middleware/errorHandler");
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const signToken = (id) => {
    const options = {
        expiresIn: JWT_EXPIRES_IN
    };
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, options);
};
const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await user_1.UserModel.findByEmail(email);
        if (existingUser) {
            return next(new errorHandler_1.AppError('该邮箱已被注册', 400));
        }
        const user = await user_1.UserModel.create({
            username,
            email,
            password
        });
        const token = signToken(user.id);
        const { password: _, ...userWithoutPassword } = user;
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: userWithoutPassword
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.UserModel.findByEmail(email);
        if (!user) {
            return next(new errorHandler_1.AppError('邮箱或密码错误', 401));
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect) {
            return next(new errorHandler_1.AppError('邮箱或密码错误', 401));
        }
        const token = signToken(user.id);
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: userWithoutPassword
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await user_1.UserModel.findById(userId);
        if (!user) {
            return next(new errorHandler_1.AppError('用户不存在', 404));
        }
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json({
            status: 'success',
            data: {
                user: userWithoutPassword
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.js.map