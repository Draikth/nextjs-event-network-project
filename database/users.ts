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

export const getUserInsecure = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.username,
      users.email
    FROM
      users
    WHERE
      username = ${username}
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
          ${username},
          ${email},
          ${passwordHash},
        )
      RETURNING
        users.id users.username users.email
    `;
    return user;
  },
);
