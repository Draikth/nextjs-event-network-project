import postgres from 'postgres';

export const postgresConfig = {
  transform: {
    ...postgres.camel,
    undefined: null,
  },
};
