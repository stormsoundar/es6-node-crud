import { MONGO_DB_CONNECTION_URI } from '../../loaders/config.js';

const devConfig = {
  dbConnectionString: MONGO_DB_CONNECTION_URI,
  mongoDebug: false,
};

export default devConfig;
