import { cache } from 'react';
import { sql } from './connect';

export type Event = {
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
  ageRestriction: boolean;
  archived: boolean;
};

export const getEventsInsecure = cache(async () => {
  const events = await sql<Event[]>`
    SELECT
      *
    FROM
      events
  `;

  return events;
});

export const getEventInsecure = cache(async (id: number) => {
  const [event] = await sql<Event[]>`
    SELECT
      *
    FROM
      events
    WHERE
      id = ${id}
  `;

  return event;
});
