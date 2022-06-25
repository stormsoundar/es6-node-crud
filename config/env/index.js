import { NODE_ENV } from '../../loaders/config.js';
import devConfig from './development.js';
import prodConfig from './production.js';
import NODE_ENV_CONSTANT from '../../constants/node_env.js';

let appConfig;

if (NODE_ENV === NODE_ENV_CONSTANT.DEVELOPMENT) appConfig = devConfig;

if (NODE_ENV === NODE_ENV_CONSTANT.PRODUCTION) appConfig = prodConfig;

export default appConfig;
