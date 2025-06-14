"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_1 = require("../models/task");
exports.TaskController = {
    async create(req, res) {
        var _a;
        try {
            const { title, description } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const task = await task_1.TaskModel.create({
                title,
                description,
                status: 'pending',
                user_id: userId,
            });
            return res.status(201).json(task);
        }
        catch (error) {
            console.error('Error creating task:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async getAll(req, res) {
        var _a;
        try {
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const tasks = await task_1.TaskModel.findAll(userId);
            return res.json(tasks);
        }
        catch (error) {
            console.error('Error getting tasks:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async getById(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const task = await task_1.TaskModel.findById(Number(id), userId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(task);
        }
        catch (error) {
            console.error('Error getting task:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async update(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const { title, description } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const task = await task_1.TaskModel.update(Number(id), userId, {
                title,
                description,
            });
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(task);
        }
        catch (error) {
            console.error('Error updating task:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async delete(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const success = await task_1.TaskModel.delete(Number(id), userId);
            if (!success) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting task:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    async toggleStatus(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const task = await task_1.TaskModel.toggleStatus(Number(id), userId);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.json(task);
        }
        catch (error) {
            console.error('Error toggling task status:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
//# sourceMappingURL=task.js.map