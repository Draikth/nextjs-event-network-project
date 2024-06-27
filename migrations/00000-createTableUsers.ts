import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(80) NOT NULL UNIQUE,
      password_hash varchar(150) NOT NULL,
      email varchar(80) NOT NULL UNIQUE,
      comments varchar(255) NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
