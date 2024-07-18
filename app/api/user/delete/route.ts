import { NextRequest, NextResponse } from 'next/server';
import { deleteUser, UserWithPasswordHash } from '../../../../database/users';

type DeleteUserResponseBody =
  | { message: string }
  | { message: string; user?: UserWithPasswordHash }
  | { message: string; error?: string };

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<DeleteUserResponseBody>> {
  const { sessionToken } = await request.json();

  if (!sessionToken) {
    return NextResponse.json(
      { message: 'Invalid request', error: 'Session token is missing' },
      { status: 400 },
    );
  }

  try {
    const user = await deleteUser(sessionToken);
    if (user) {
      return NextResponse.json(
        { message: 'User deleted successfully', user },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: 'User not found or session expired' },
        { status: 404 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 },
    );
  }
}
