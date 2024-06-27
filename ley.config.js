import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const options = {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
};

export default options;
