import { postgresConfig, setEnvironmentVariables } from './util/config.js';

setEnvironmentVariables();

// const options = {
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// };

export default postgresConfig;
