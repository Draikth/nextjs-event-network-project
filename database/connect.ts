import 'server-only';
import { unstable_noStore as noStore } from 'next/cache';
import postgres, { Sql } from 'postgres';
import postgresConfig from '../ley.config';
import { setEnvironmentVariables } from '../util/config';

setEnvironmentVariables();

declare global {
  var postgresSqlClient: Sql | undefined;
}

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres(postgresConfig);
  }

  // Workaround to force Next.js Dynamic Rendering on every database query:
  //
  // Wrap sql`` tagged template function to call `noStore()` from
  // next/cache before each database query. `noStore()` is a
  // Next.js Dynamic Function, which causes the page to use
  // Dynamic Rendering
  //
  // https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering
  //
  // Ideally there would something built into Next.js for this,
  // which has been requested here:
  //
  // https://github.com/vercel/next.js/discussions/50695
  return ((
    ...sqlParameters: Parameters<typeof globalThis.postgresSqlClient>
  ) => {
    noStore();
    if (!globalThis.postgresSqlClient) {
      throw new Error('Postgres client is not initialized');
    }
    return globalThis.postgresSqlClient(...sqlParameters);
  }) as Sql;
}

export const sql = connectOneTimeToDatabase();

// import { config } from 'dotenv-safe';
// import postgres from 'postgres';

// config();

// export const sql = postgres({
//   transform: {
//     ...postgres.camel,
//     undefined: null,
//   },
// });
