import { config } from 'dotenv-safe';
import { postgresConfig } from './util/config.js';

config();

// const options = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
