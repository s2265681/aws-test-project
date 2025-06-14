"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./middleware/logger");
const auth_1 = __importDefault(require("./routes/auth"));
const task_1 = __importDefault(require("./routes/task"));
const health_1 = __importDefault(require("./routes/health"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_1.logger);
app.use('/api/auth', auth_1.default);
app.use('/api/tasks', task_1.default);
app.use('/api/health', health_1.default);
app.use('/api/users', users_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map