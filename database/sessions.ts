import { cache } from 'react';
import { Session } from '../migrations/00005-createTableSessions';
import { sql } from './connect';

export const createSessionInsecure = cache(
  async (token: string, userId: number) => {
    const [session] = await sql<Session[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.id,
        sessions.token,
        sessions.user_id
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        expiry_timestamp < now()
    `;

    return session;
  },
);
