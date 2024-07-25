// import { Sql } from 'postgres';
// import { z } from 'zod';

// export type EvImage = {
//   id: number;
//   url: string;
// };

// export const imageSchema = z.object({
//   url: z.string().url(),
// });

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE image_uploads (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       url varchar(255) NOT NULL
//     );
//   `;
// }

// export async function down(sql: Sql) {
//   await sql`DROP TABLE image_uploads`;
// }
