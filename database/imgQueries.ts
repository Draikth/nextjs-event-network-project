import { cache } from 'react';
import { sql } from './connect';

export type EvImage = {
  id: number;
  url: string;
};

export const getImagesInsecure = cache(async () => {
  return await sql<EvImage[]>`
    SELECT
      image_uploads.*
    FROM
      image_uploads
  `;
});

export const createImageInsecure = cache(async (url: string) => {
  const [image] = await sql<EvImage[]>`
    INSERT INTO
      image_uploads (url)
    VALUES
      (
        ${url}
      )
    RETURNING
      image_uploads.*
  `;
  return image;
});
