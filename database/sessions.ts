import { cache } from 'react';
import { Session } from '../migrations/00006-createTableSessions';
import { sql } from './connect';

export const getValidSession = cache(async (sessionToken: string) => {
  const [session] = await sql<Omit<Session, 'id'>[]>`
    SELECT
      sessions.token,
      sessions.user_id
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND expiry_timestamp > now()
  `;
  return session;
});

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

export const deleteSession = cache(async (sessionToken: string) => {
  const [session] = await sql<Omit<Session, 'userId'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.id,
      sessions.token
  `;
  return session;
});
