import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUser } from '../../../database/users';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfile(props: Props) {
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  // 4. If user exists, render the page
  return <h1>{props.params.username}'s Profile</h1>;
}
