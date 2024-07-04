import { Sql } from 'postgres';
import { z } from 'zod';

export const userSchema = z.object({
  username: z.string().min(3),
  email: z.string().min(3),
  password: z.string().min(3),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(150) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
