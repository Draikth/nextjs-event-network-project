import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../database/sessions';
import { getUser } from '../../database/users';
import PostEventForm from './PostEventForm';

export const metadata = {
  title: 'Post Events',
  description: 'Form where registered members post upcoming events',
};

export default async function PostEventsPage() {
  // 1. Check if SessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));

  // 3. If sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo

  if (!session) {
    redirect(`/login?returnTo=/post`);
  }

  const profile = await getUser(session.token);
  if (!profile) {
    redirect('/login');
  }

  return <PostEventForm userId={profile.id} />;
}
