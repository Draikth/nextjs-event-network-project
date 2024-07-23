import { Sql } from 'postgres';

// import { z } from 'zod';

// export const eventSchema = z.object({
//   name: z.string().min(1),
//   userId: z.number(),
//   type: z.string().min(3),
//   date: z.date(),
//   location: z.string(),
//   duration: z.number(),
//   entryFee: z.number(),
//   category: z.string(),
//   description: z.string(),
//   organizerUrl: z.string(),
//   image: z.string(),
//   ageRestriction: z.boolean(),
//   archived: z.boolean(),
// });

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
