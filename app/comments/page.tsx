import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getComments } from '../../database/comments';
import { getEvent } from '../../database/events';
import { getUser } from '../../database/users';
import CommentsForm from './CommentsForm';

type SearchParams = { eventId?: string };

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: SearchParams; // Use the defined type here
}) {
  const sessionCookie = cookies().get('sessionToken');

  if (!sessionCookie) {
    redirect('/login?returnTo=/comments');
    return null;
  }

  const user = await getUser(sessionCookie.value);

  if (!user) {
    redirect('/login?returnTo=/comments');
    return null;
  }

  const eventId = searchParams.eventId;

  if (!eventId) {
    return <p>Event ID is missing in the query parameters.</p>;
  }

  const siteEvent = await getEvent(sessionCookie.value, parseInt(eventId));

  if (!siteEvent) {
    return (
      <p>Event not found or you do not have permission to view this event.</p>
    );
  }

  const comments = await getComments(sessionCookie.value);

  return <CommentsForm comments={comments} user={user} event={siteEvent} />;
}

// import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';
// import { getComments } from '../../database/comments';
// import { getEvent } from '../../database/events';
// import { getUser } from '../../database/users';
// import CommentsForm from './CommentsForm';

// // import CommentsForm from './CommentsForm';

// export default async function CommentsPage() {
//   // Task: Restrict access to the notes page and only display notes belonging to the current logged in user
//   // 1. Check if the sessionToken cookie exists
//   const sessionCookie = cookies().get('sessionToken');

//   // 2. Query user with the sessionToken
//   const user = sessionCookie && (await getUser(sessionCookie.value));

//   // 3. If the user does not exist, redirect to the login with the returnTo query parameter
//   if (!user) redirect(`/login?returnTo=/${user}`);

//   // 4. Display the notes for the current logged in user

//   const comments = await getComments(sessionCookie.value);
//   console.log(comments);

//   return <h1>posted comments</h1>;

//   const siteEvent = await getEvent(
//     sessionCookie.value,
//     parseInt(params.eventId),
//   );

//   if (!siteEvent) {
//     return <p>Event not found or you do not have permission to view this.</p>;
//   }

//   return <CommentsForm comments={comments} user={user!} event={siteEvent!} />;
// }
