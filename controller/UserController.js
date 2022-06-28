import asyncHandler from '../middleware/asyncHandler.js';
import Users from '../model/user.js';
import httpStatus from '../constants/http_status.js';
const userController = {};

/**
 *  @desc   Get User
 *  @route  GET /api/v1/users/me
 *  @access Private
 */
userController.me = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const userFound = await Users.findOne({ _id }).select('-password');

  return res.status(httpStatus.OK).send({ success: true, data: userFound });
});

export default userController;
