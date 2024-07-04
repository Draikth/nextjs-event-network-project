import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserWithPasswordHashInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'email'>;
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
  console.log('Request body: ', body);

  // 2. Validate the user data with Zod
  const result = userSchema.safeParse(body);

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
  // 6. Create the session record
  // 7. send the new cookie in the headers

  // 8. Return the new user information without the password hash
  return NextResponse.json({ user: { email: userWithPasswordHash.email } });
}
