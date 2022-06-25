import express from 'express';
import authController from '../../controller/AuthController.js';
import { validation } from '../../middleware/validation.js';
import authValidation from '../../validations/authSchema.js';

const routes = express.Router();

routes.post(
  '/registration',
  validation(authValidation.registrationSchema),
  authController.registration
);

routes.post(
  '/login',
  validation(authValidation.loginSchema),
  authController.login
);

export default routes;
