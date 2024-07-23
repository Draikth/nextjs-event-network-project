import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createEvent, eventSchema, SiteEvent } from '../../../database/events';

export type PostEventsResponseBodyPost =
  | {
      event: SiteEvent;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<PostEventsResponseBodyPost>> {
  // Task: Create a note for the current logged in user

  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate notes data with zod
  const result = eventSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Request does not contain event object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. Create the Event
  const postEvent =
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
  if (!postEvent) {
    return NextResponse.json(
      { error: 'Note not created or access denied creating note' },
      {
        status: 500,
      },
    );
  }

  // 6. Return the content of the event
  return NextResponse.json({ event: postEvent });
}
