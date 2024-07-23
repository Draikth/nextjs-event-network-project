import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  email: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUser = cache(async (sessionToken: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.username,
      users.id,
      users.email
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  return user;
});

export const deleteUser = cache(async (sessionToken: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    DELETE FROM users USING sessions
    WHERE
      sessions.token = ${sessionToken}
      AND sessions.expiry_timestamp > now()
      AND users.id = sessions.user_id
    RETURNING
      users.*
  `;

  return user;
});

export const getUserInsecure = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      users.email
    FROM
      users
    WHERE
      username = ${username.toLowerCase()}
  `;
  return user;
});

export const createUserInsecure = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          email,
          password_hash
        )
      VALUES
        (
          ${username.toLowerCase()},
          ${email},
          ${passwordHash}
        )
      RETURNING
        users.id,
        users.username,
        users.email
    `;
    return user;
  },
);

export const getUserWithPasswordHashInsecure = cache(async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user;
});
