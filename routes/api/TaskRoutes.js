import express from 'express';
import taskController from '../../controller/TaskController.js';
import { validation } from '../../middleware/validation.js';
import taskValidation from '../../validations/taskSchema.js';

const routes = express.Router();

routes.post(
  '/create',
  validation(taskValidation.taskCreateSchema),
  taskController.createTask
);

routes.get('/', taskController.listTasks);

routes.patch(
  '/:id',
  validation(taskValidation.taskUpdateSchema),
  taskController.updateTask
);

routes.delete('/:id', taskController.deleteTask);

export default routes;
