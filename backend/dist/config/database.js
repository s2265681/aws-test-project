"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const kysely_1 = require("kysely");
const mysql2_1 = require("mysql2");
const dialect = new kysely_1.MysqlDialect({
    pool: (0, mysql2_1.createPool)({
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'shang123456',
        database: process.env.DB_NAME || 'aws_test',
    }),
});
exports.db = new kysely_1.Kysely({
    dialect,
});
//# sourceMappingURL=database.js.map