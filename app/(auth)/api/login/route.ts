import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  getUserWithPasswordHashInsecure,
  User,
} from '../../../../database/users';
import { loginSchema } from '../../../../migrations/00000-createTableUsers';
import { secureCookieOptions } from '../../../../util/cookies';

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(3),
// });

const login = loginSchema;

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'username'>;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // Task: Implement the user Login workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data with Zod
  const result = login.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Verify user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.email,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid Email or Password' }] },
      {
        status: 500,
      },
    );
  }

  // 4. Validate the user password by comparing with hashed password

  const passwordHash = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Invalid Email or Password' }] },
      {
        status: 500,
      },
    );
  }

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create the session record
  const session = await createSessionInsecure(token, userWithPasswordHash.id);

  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Session creation failed' }] },
      {
        status: 401,
      },
    );
  }

  // 7. send the new cookie in the headers
  // cookies().set({
  //   name: 'sessionToken',
  //   value: session.token,
  //   httpOnly: true,
  //   path: '/',
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 60 * 60 * 24,
  //   sameSite: 'lax',
  // });

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // 8. Return the new user information without the password hash
  return NextResponse.json({
    user: { username: userWithPasswordHash.username },
  });
}
