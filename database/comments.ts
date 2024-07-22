import { cache } from 'react';
import { sql } from './connect';

export type Comment = {
  id: number;
  eventId: number;
  commentText: string;
  userId: number;
};

export const getComments = cache(async (sessionToken: string) => {
  const comments = await sql<Comment[]>`
    SELECT
      comments.*
    FROM
      comments
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = comments.user_id
        AND expiry_timestamp > now()
      )
  `;
  return comments;
});

export const getComment = cache(
  async (sessionToken: string, commentId: number) => {
    const [comment] = await sql<Comment[]>`
      SELECT
        comments.*
      FROM
        comments
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = comments.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        comments.id = ${commentId}
    `;
    return comment;
  },
);

export const createComment = cache(
  async (sessionToken: string, textContent: string) => {
    const [note] = await sql<Comment[]>`
      INSERT INTO
        comments (user_id, comment_text) (
          SELECT
            user_id,
            ${textContent}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        comments.*
    `;

    return note;
  },
);
