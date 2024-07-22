import { Sql } from 'postgres';
import { z } from 'zod';

export const commentSchema = z.object({
  commentText: z.string().min(1),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE comments (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      event_id integer NOT NULL REFERENCES events (id) ON DELETE cascade,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade,
      comment_text text NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE comments`;
}
