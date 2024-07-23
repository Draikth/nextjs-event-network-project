import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createEvent, SiteEvent } from '../../../database/events';
import { eventSchema } from '../../../migrations/00002-createTableEvents';

export type PostEventsResponseBodyPost =
  | {
      event: SiteEvent;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<PostEventsResponseBodyPost>> {
  // Task: Create a note for the current logged in user

  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate notes data with zod
  const result = eventSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain event object' },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. Create the Event
  const newEvent =
    sessionTokenCookie &&
    (await createEvent(sessionTokenCookie.value, {
      name: result.data.name,
      userId: result.data.userId,
      type: result.data.type,
      category: result.data.category,
      date: result.data.date,
      location: result.data.location,
      entryFee: result.data.entryFee,
      description: result.data.description,
      organizerUrl: result.data.organizerUrl,
      duration: result.data.duration,
      ageRestriction: result.data.ageRestriction,
      image: result.data.image,
      archived: result.data.archived,
    }));

  // 5. If the note creation fails, return an error
  if (!newEvent) {
    return NextResponse.json(
      { error: 'Note not created or access denied creating note' },
      {
        status: 500,
      },
    );
  }

  // 6. Return the content of the event
  return NextResponse.json({ event: newEvent });
}
