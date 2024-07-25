import { cache } from 'react';
import { z } from 'zod';
import { sql } from './connect';

export type SiteEvent = {
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

export const eventSchema = z.object({
  name: z.string().min(1),
  userId: z.number(),
  type: z.string().min(3),
  date: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date()),
  location: z.string(),
  duration: z.number(),
  entryFee: z.number(),
  category: z.string(),
  description: z.string(),
  organizerUrl: z.string(),
  image: z.string(),
  ageRestriction: z.boolean(),
  archived: z.boolean(),
});

export const getEvents = cache(async (sessionToken: string) => {
  const events = await sql<SiteEvent[]>`
    SELECT
      events.*
    FROM
      events
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = events.user_id
        AND expiry_timestamp > now()
      )
  `;
  return events;
});

export const getEvent = cache(async (sessionToken: string, eventId: number) => {
  const [event] = await sql<SiteEvent[]>`
    SELECT
      events.*
    FROM
      events
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = events.user_id
        AND expiry_timestamp > now()
      )
    WHERE
      events.id = ${eventId}
  `;
  return event;
});

export const getEventsInsecure = cache(async () => {
  const events = await sql<SiteEvent[]>`
    SELECT
      *
    FROM
      events
  `;

  return events;
});

export const getEventInsecure = cache(async (id: number) => {
  const [event] = await sql<SiteEvent[]>`
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
  async (sessionToken: string, newEvent: Omit<SiteEvent, 'id'>) => {
    const [event] = await sql<SiteEvent[]>`
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
            user_id,
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
