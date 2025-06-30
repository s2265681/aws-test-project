"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
const auth_1 = require("./middleware/auth");
const auth_2 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const health_1 = __importDefault(require("./routes/health"));
const users_1 = __importDefault(require("./routes/users"));
const requiredEnvVars = ['JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars.join(', '));
    process.exit(1);
}
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/tasks', auth_1.protect);
app.use('/api/users', auth_1.protect);
app.use(logger_1.logger);
app.use('/api/auth', auth_2.default);
app.use('/api/tasks', task_1.default);
app.use('/api/health', health_1.default);
app.use('/api/users', users_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('JWT_SECRET is set:', !!process.env.JWT_SECRET);
});
//# sourceMappingURL=index.js.map