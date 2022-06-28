import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_SECRET } from '../loaders/config.js';
import Users from '../model/user.js';
import asyncHandler from './asyncHandler.js';

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];

  // Make sure token exists
  if (!token) return next(new ErrorResponse('Unauthorized', 401));

  // Verify token
  const decoded = jwt.verify(token, AUTH_TOKEN_SECRET);

  req.user = await Users.findOne({ _id: decoded._id });

  next();
});
