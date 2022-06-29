import mongoose from 'mongoose';

import appConfig from '../env/index.js';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () =>
  console.log('MongoDB Connection Established'.cyan.bold)
);

mongoose.connection.on('reconnected', () =>
  console.log('MongoDB Connection Reestablished'.cyan.bold)
);

mongoose.connection.on('disconnected', () =>
  console.log('MongoDB Connection Disconnected'.red.bold)
);

mongoose.connection.on('close', () =>
  console.log('MongoDB Connection Closed'.red.bold)
);

mongoose.connection.on('error', (error) => {
  console.log('MongoDB ERROR: ' + error);

  process.exit(1);
});

mongoose.set('debug', appConfig.mongoDebug);

const connectDB = async () => {
  let connectionUri = appConfig.dbConnectionString;

  await mongoose.connect(connectionUri, {});
};

export default connectDB;
