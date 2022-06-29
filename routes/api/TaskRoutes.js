import express from 'express';
import taskController from '../../controller/TaskController.js';
import { protect } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import taskValidation from '../../validations/taskSchema.js';

const routes = express.Router();

routes.post(
  '/create',
  validation(taskValidation.taskCreateSchema),
  taskController.createTask
);

routes.get('/', protect, taskController.listTasks);

routes.patch(
  '/:id',
  protect,
  validation(taskValidation.taskUpdateSchema),
  taskController.updateTask
);

routes.delete('/:id', protect, taskController.deleteTask);

export default routes;
