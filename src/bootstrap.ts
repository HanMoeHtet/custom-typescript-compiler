import { config } from 'dotenv';

const nodeEnv = process.env['NODE_ENV'] || 'development';
const dotEnvFile = nodeEnv === 'development' ? '.env' : '.env.production';

config({
  path: dotEnvFile,
});
