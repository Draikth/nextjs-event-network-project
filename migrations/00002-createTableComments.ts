import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      event_id integer NOT NULL,
      user_id integer NOT NULL,
      comment_text text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE comments`;
}
