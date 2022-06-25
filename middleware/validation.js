import httpStatus from '../constants/http_status.js';
import ErrorResponse from '../utils/errorResponse.js';

export const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!error) next();
    else {
      const message = error.details
        .map((i) => i.message)
        .join(',')
        .replace(/['"]+/g, '');
      return next(new ErrorResponse(message, httpStatus.UNPROCESSABLE_ENTITY));
    }
  };
};
