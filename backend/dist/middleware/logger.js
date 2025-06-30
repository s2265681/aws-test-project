"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    var _a, _b;
    const start = Date.now();
    const username = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) || '未登录用户';
    const id = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || '';
    console.log('Request user:', req.user);
    console.log(`[${new Date().toISOString()}] ${id} ${username} ${req.method} ${req.url}`);
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${new Date().toISOString()}] ${id} ${username}${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map