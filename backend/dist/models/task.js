"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const database_1 = require("../config/database");
const kysely_1 = require("kysely");
exports.TaskModel = {
    async create(data) {
        const now = new Date();
        const result = await database_1.db
            .insertInto('tasks')
            .values({
            id: (0, kysely_1.sql) `DEFAULT`,
            ...data,
            created_at: now,
            updated_at: now,
        })
            .executeTakeFirst();
        const insertId = result === null || result === void 0 ? void 0 : result.insertId;
        if (!insertId)
            throw new Error('Failed to get insertId');
        return await database_1.db
            .selectFrom('tasks')
            .selectAll()
            .where('id', '=', insertId)
            .executeTakeFirstOrThrow();
    },
    async findAll(userId) {
        return await database_1.db
            .selectFrom('tasks')
            .where('user_id', '=', userId)
            .orderBy('created_at', 'desc')
            .selectAll()
            .execute();
    },
    async findById(id, userId) {
        return await database_1.db
            .selectFrom('tasks')
            .where('id', '=', id)
            .where('user_id', '=', userId)
            .selectAll()
            .executeTakeFirst();
    },
    async update(id, userId, data) {
        const now = new Date();
        const result = await database_1.db
            .updateTable('tasks')
            .set({
            ...data,
            updated_at: now,
        })
            .where('id', '=', id)
            .where('user_id', '=', userId)
            .executeTakeFirst();
        if (Number(result.numUpdatedRows) === 0)
            return undefined;
        return await database_1.db
            .selectFrom('tasks')
            .selectAll()
            .where('id', '=', id)
            .where('user_id', '=', userId)
            .executeTakeFirst();
    },
    async delete(id, userId) {
        const result = await database_1.db
            .deleteFrom('tasks')
            .where('id', '=', id)
            .where('user_id', '=', userId)
            .executeTakeFirst();
        return result.numDeletedRows > 0;
    },
    async toggleStatus(id, userId) {
        const task = await this.findById(id, userId);
        if (!task)
            return undefined;
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        return await this.update(id, userId, { status: newStatus });
    },
};
//# sourceMappingURL=task.js.map