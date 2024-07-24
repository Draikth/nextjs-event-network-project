import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getEvents } from '../../../database/events';
import { getUser } from '../../../database/users';
import DeleteProfileForm from './DeleteProfileForm'; // Import the client component
import UserPostedEvents from './UserPostedEvents';

type Props = {
  params: {
    username: string;
  };
};

export default async function UserProfilePage(props: Props) {
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
  }

  const events = await getEvents(sessionCookie.value);

  // 4. If user exists, render the page and include the DeleteProfileForm component
  return (
    <>
      <h1>{props.params.username}'s Profile</h1>
      <br />
      <UserPostedEvents user={user} events={events} />
      <br />
      <br />
      <DeleteProfileForm sessionToken={sessionCookie.value} />
    </>
  );
}
