import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE events (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      name varchar(80) NOT NULL,
      type varchar(150) NOT NULL,
      date timestamp NOT NULL,
      location varchar(255) NOT NULL,
      duration integer NULL,
      entry_fee integer NULL,
      category varchar(255) NOT NULL,
      description text NOT NULL,
      image varchar(255) NOT NULL,
      organizer_url varchar(255) NOT NULL,
      age_restriction boolean NOT NULL DEFAULT FALSE,
      archived boolean NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE events`;
}
