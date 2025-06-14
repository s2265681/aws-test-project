"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const user_1 = require("../models/user");
const errorHandler_1 = require("../middleware/errorHandler");
const router = express_1.default.Router();
router.get('/me', auth_1.protect, async (req, res, next) => {
    var _a;
    try {
        const user = await user_1.UserModel.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            return next(new errorHandler_1.AppError('用户不存在', 404));
        }
        const { password, ...userWithoutPassword } = user;
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
});
router.patch('/me', auth_1.protect, async (req, res, next) => {
    var _a, _b;
    try {
        const { username, email } = req.body;
        const updated = await user_1.UserModel.update((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
            username,
            email
        });
        if (!updated) {
            return next(new errorHandler_1.AppError('更新失败', 400));
        }
        const user = await user_1.UserModel.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
        const { password, ...userWithoutPassword } = user;
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
});
exports.default = router;
//# sourceMappingURL=users.js.map