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
  // 1. Get the event data from the request
  const body = await request.json();

  // 2. Validate events data with zod
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

  // 5. If the event creation fails, return an error
  if (!postEvent) {
    return NextResponse.json(
      { error: 'Event not created or access denied creating event' },
      {
        status: 500,
      },
    );
  }

  // 6. Return the content of the event
  return NextResponse.json({ event: postEvent });
}
