import asyncHandler from '../middleware/asyncHandler.js';
import Tasks from '../model/task.js';
import ErrorResponse from '../utils/errorResponse.js';
import httpStatus from '../constants/http_status.js';
const taskController = {};

/**
 *  @desc   Create Task
 *  @route  POST /api/v1/tasks/create
 *  @access Private
 */
taskController.createTask = asyncHandler(async (req, res, next) => {
  const { task, subTasks, user } = req.body;

  const isExistingTask = await Tasks.findOne({ task });

  if (isExistingTask)
    return next(new ErrorResponse('Task Already Exists!', httpStatus.CONFLICT));

  const createTask = await Tasks.create({
    task,
    subTasks,
    user,
  });

  return res
    .status(httpStatus.CREATED)
    .send({ success: true, data: createTask });
});

/**
 *  @desc   List Tasks
 *  @route  GET /api/v1/tasks
 *  @access Private
 */
taskController.listTasks = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const tasks = await Tasks.find({ user: _id }).sort('-updatedAt');

  return res.status(httpStatus.OK).send({ success: true, data: tasks });
});

/**
 *  @desc   Update Task
 *  @route  PATCH /api/v1/tasks/:id
 *  @access Private
 */
taskController.updateTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const allowedUpdates = ['task', 'subTasks', 'starred', 'status'];
  const updates = Object.keys(req.body);

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(new ErrorResponse('Invalid id', httpStatus.BAD_REQUEST));

  const isUpdateValid = updates.every((update) =>
    allowedUpdates.includes(update.trim())
  );

  if (!isUpdateValid)
    return next(
      new ErrorResponse('Input field invalid', httpStatus.BAD_REQUEST)
    );

  const updatedTask = await Tasks.findOneAndUpdate(
    { _id: id, user: _id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updatedTask)
    return next(new ErrorResponse('Task not found', httpStatus.NOT_FOUND));

  return res.status(httpStatus.OK).send({ success: true, data: updatedTask });
});

/**
 *  @desc   Delete Task
 *  @route  DELETE /api/v1/tasks/:id
 *  @access Private
 */
taskController.deleteTask = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/))
    return next(new ErrorResponse('Invalid id', httpStatus.BAD_REQUEST));

  const deletedTask = await Tasks.findOneAndDelete({ _id: id });

  if (!deletedTask)
    return next(new ErrorResponse('Task not found', httpStatus.NOT_FOUND));

  return res.status(httpStatus.OK).send({ success: true, data: deletedTask });
});

export default taskController;
