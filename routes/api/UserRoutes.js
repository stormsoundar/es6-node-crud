import express from 'express';
import userController from '../../controller/UserController.js';
import { protect } from '../../middleware/auth.js';

const routes = express.Router();

routes.get('/me', protect, userController.me);

export default routes;
