"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const kysely_1 = require("kysely");
const mysql2_1 = require("mysql2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dialect = new kysely_1.MysqlDialect({
    pool: (0, mysql2_1.createPool)({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'aws_test',
    })
});
exports.db = new kysely_1.Kysely({
    dialect,
});
//# sourceMappingURL=index.js.map