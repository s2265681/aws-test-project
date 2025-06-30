"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controllers/task");
const router = (0, express_1.Router)();
router.get('/', task_1.TaskController.getAll);
router.get('/:id', task_1.TaskController.getById);
router.post('/', task_1.TaskController.create);
router.put('/:id', task_1.TaskController.update);
router.delete('/:id', task_1.TaskController.delete);
router.patch('/:id/toggle', task_1.TaskController.toggleStatus);
exports.default = router;
//# sourceMappingURL=task.js.map