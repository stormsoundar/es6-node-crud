import express from 'express';
import authRoutes from './AuthRoutes.js';

const apiRoutes = express.Router();

apiRoutes.get('/', function (req, res, next) {
  res.send({ message: 'api v1 is connected' });
});

apiRoutes.use('/auth', authRoutes);

export default apiRoutes;
