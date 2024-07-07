import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE event_categories (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      event_id integer NOT NULL REFERENCES events (id) ON DELETE cascade,
      category_id integer NOT NULL REFERENCES categories (id) ON DELETE cascade
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE event_categories`;
}
