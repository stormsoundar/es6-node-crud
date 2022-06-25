import asyncHandler from '../middleware/asyncHandler.js';
import Users from '../model/user.js';
import ErrorResponse from '../utils/errorResponse.js';
import httpStatus from '../constants/http_status.js';
const authController = {};

/**
 *  @desc   Create User
 *  @route  POST /api/v1/auth/registration
 *  @access Public
 */
authController.registration = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    city,
    state,
    country,
  } = req.body;

  const isExistingUser = await Users.findOne({ email });

  if (isExistingUser)
    return next(new ErrorResponse('Mail Already Exists!', httpStatus.CONFLICT));

  const user = await Users.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    city,
    state,
    country,
  });

  return res.status(httpStatus.CREATED).send({ success: true, data: user });
});

/**
 *  @desc   Login
 *  @route  POST /api/v1/auth/login
 *  @access Public
 */
authController.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });

  if (!user)
    return next(new ErrorResponse('Invalid credentials', httpStatus.NOT_FOUND));

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch)
    return next(
      new ErrorResponse('Invalid credentials', httpStatus.BAD_REQUEST)
    );

  // Create token
  const token = user.getSignedJwtToken();

  return res.status(httpStatus.OK).send({ success: true, token });
});

export default authController;
