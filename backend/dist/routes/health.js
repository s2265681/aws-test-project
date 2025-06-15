"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../database/index");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        await index_1.db.selectFrom('users').select('id').limit(1).execute();
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {
                database: 'connected',
                server: 'running'
            }
        });
    }
    catch (error) {
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
exports.default = router;
//# sourceMappingURL=health.js.map