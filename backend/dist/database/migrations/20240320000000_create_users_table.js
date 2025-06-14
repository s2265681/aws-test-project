"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('users')
        .ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('username', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('email', 'varchar(255)', (col) => col.notNull().unique())
        .addColumn('password', 'varchar(255)', (col) => col.notNull())
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP`))
        .addColumn('updated_at', 'timestamp', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`))
        .execute();
}
async function down(db) {
    await db.schema.dropTable('users').execute();
}
//# sourceMappingURL=20240320000000_create_users_table.js.map