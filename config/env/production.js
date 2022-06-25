import { MONGO_DB_CONNECTION_URI } from '../../loaders/config.js';

const prodConfig = {
  dbConnectionString: MONGO_DB_CONNECTION_URI,
  mongoDebug: true,
};

export default prodConfig;
