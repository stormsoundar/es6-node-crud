import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './config/db/db.js';
import { NODE_ENV, PORT } from './loaders/config.js';
import mainRouter from './routes/index.js';
import errorHandler from './middleware/error.js';

const app = express();

// Body parser
app.use(express.json());

// Connect DB
connectDB();

// Logging middleware
app.use(morgan('dev'));

// Mount Routes
app.use('/', mainRouter);

// Error Handler
app.use(errorHandler);

app.get('/', (req, res, next) => {
  res.send({ message: 'Api connected!' });
});

app.listen(PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
