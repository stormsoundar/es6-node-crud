import Joi from 'joi';

const taskValidation = {};

taskValidation.taskCreateSchema = Joi.object().keys({
  task: Joi.string().required().min(3).max(50),
  subTasks: Joi.array().items(Joi.string().min(3).max(50)),
});

taskValidation.taskUpdateSchema = Joi.object().keys({
  task: Joi.string().min(3).max(50),
  subTasks: Joi.array().items(Joi.string().min(3).max(50)),
  starred: Joi.string().valid('true', 'false'),
  status: Joi.string().valid('incomplete', 'completed'),
});

export default taskValidation;
