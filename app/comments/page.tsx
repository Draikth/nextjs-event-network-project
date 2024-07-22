import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getComments } from '../../database/comments';
import { getUser } from '../../database/users';

// import CommentsForm from './CommentsForm';

export default async function CommentsPage() {
  // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionCookie && (await getUser(sessionCookie.value));

  // 3. If the user does not exist, redirect to the login with the returnTo query parameter
  if (!user) redirect(`/login?returnTo=/${user}`);

  // 4. Display the notes for the current logged in user

  const comments = await getComments(sessionCookie.value);
  console.log(comments);

  return <h1>posted comments</h1>;

  //   return <CommentsForm comments={comments} user={user} event={event} />;
}
