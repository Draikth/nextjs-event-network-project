import { cache } from 'react';
import { sql } from './connect';

export const getEventsInsecure = cache(async () => {
  const events = await sql<
    {
      id: number;
      userId: number;
      name: string;
      type: string;
      date: Date;
      location: string;
      duration: number | null;
      entryFee: number | null;
      category: string;
      description: string;
      image: string;
      organizerUrl: string;
      ageRestriction: boolean | null;
      archived: boolean;
    }[]
  >`
    SELECT
      *
    FROM
      events
  `;

  return events;
});

export const getEventInsecure = cache(async (id: number) => {
  const [event] = await sql<
    {
      id: number;
      userId: number;
      name: string;
      type: string;
      date: Date;
      location: string;
      duration: number | null;
      entryFee: number | null;
      category: string;
      description: string;
      image: string;
      organizerUrl: string;
      ageRestriction: boolean | null;
      archived: boolean;
    }[]
  >`
    SELECT
      *
    FROM
      events
    WHERE
      id = ${id}
  `;

  return event;
});
