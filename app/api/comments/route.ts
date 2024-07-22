import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createComment } from '../../../database/comments';
import { commentSchema } from '../../../migrations/00003-createTableComments';

export type CommentsResponseBodyPost =
  | {
      comment: { commentText: string };
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CommentsResponseBodyPost>> {
  // Task: Create a note for the current logged in user

  // 1. Get the note data from the request
  const body = await request.json();

  // 2. Validate notes data with zod
  const result = commentSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Request does not contain note object' },
      {
        status: 400,
      },
    );
  }

  // 3. Get the token from the cookie
  const sessionTokenCookie = cookies().get('sessionToken');

  // 4. Create the comment
  const newComment =
    sessionTokenCookie &&
    (await createComment(sessionTokenCookie.value, result.data.commentText));

  // 5. If the note creation fails, return an error
  if (!newComment) {
    return NextResponse.json(
      { error: 'Note not created or access denied creating note' },
      {
        status: 400,
      },
    );
  }

  // 6. Return the text content of the note
  return NextResponse.json({
    comment: {
      commentText: newComment.commentText,
    },
  });
}
