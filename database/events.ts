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

export const createEvent = cache(
  async (sessionToken: string, newEvent: Omit<Event, 'id'>) => {
    const [event] = await sql<Event[]>`
      INSERT INTO
        events (
          user_id,
          name,
          type,
          date,
          location,
          duration,
          entry_fee,
          category,
          description,
          image,
          organizer_url,
          age_restriction,
          archived
        ) (
          SELECT
            ${newEvent.userId},
            ${newEvent.name},
            ${newEvent.type},
            ${newEvent.date},
            ${newEvent.location},
            ${newEvent.duration},
            ${newEvent.entryFee},
            ${newEvent.category},
            ${newEvent.description},
            ${newEvent.image},
            ${newEvent.organizerUrl},
            ${newEvent.ageRestriction},
            ${newEvent.archived}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        events.*
    `;

    return event;
  },
);
