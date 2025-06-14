"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = require("../config/database");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const kysely_1 = require("kysely");
class UserModel {
    static async create(user) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 12);
        await database_1.db
            .insertInto('users')
            .values({
            id: (0, kysely_1.sql) `DEFAULT`,
            username: user.username,
            email: user.email,
            password: hashedPassword,
            created_at: new Date(),
            updated_at: new Date(),
        })
            .execute();
        const inserted = await database_1.db
            .selectFrom('users')
            .selectAll()
            .where('email', '=', user.email)
            .executeTakeFirstOrThrow();
        return inserted;
    }
    static async findByEmail(email) {
        const user = await database_1.db
            .selectFrom('users')
            .selectAll()
            .where('email', '=', email)
            .executeTakeFirst();
        return user || null;
    }
    static async findById(id) {
        const user = await database_1.db
            .selectFrom('users')
            .selectAll()
            .where('id', '=', id)
            .executeTakeFirst();
        return user || null;
    }
    static async update(id, user) {
        var _a;
        const result = await database_1.db
            .updateTable('users')
            .set({
            ...user,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .executeTakeFirst();
        return ((_a = result === null || result === void 0 ? void 0 : result.numUpdatedRows) !== null && _a !== void 0 ? _a : 0) > 0;
    }
    static async delete(id) {
        var _a;
        const result = await database_1.db
            .deleteFrom('users')
            .where('id', '=', id)
            .executeTakeFirst();
        return ((_a = result === null || result === void 0 ? void 0 : result.numDeletedRows) !== null && _a !== void 0 ? _a : 0) > 0;
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map