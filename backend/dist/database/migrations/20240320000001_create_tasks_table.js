"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('tasks')
        .ifNotExists()
        .addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
        .addColumn('title', 'varchar(255)', (col) => col.notNull())
        .addColumn('description', 'text')
        .addColumn('status', 'varchar(20)', (col) => col.notNull().defaultTo('pending'))
        .addColumn('user_id', 'integer', (col) => col.notNull().references('users.id').onDelete('cascade'))
        .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP`))
        .addColumn('updated_at', (0, kysely_1.sql) `timestamp not null default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP`)
        .execute();
}
async function down(db) {
    await db.schema.dropTable('tasks').execute();
}
//# sourceMappingURL=20240320000001_create_tasks_table.js.map