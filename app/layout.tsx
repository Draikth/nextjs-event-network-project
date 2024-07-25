import './globals.scss';
import localFont from 'next/font/local';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUser } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';
import styles from './layout.module.scss';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: {
    default: 'Event Network Project | Uplvl Final Proj',
    template: '%s | Uplvl Final Proj',
  },
  description:
    'Reference point for information on events happening around the city',
};

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  // Check if the sessionToken cookie exists.
  const sessionCookie = cookies().get('sessionToken');

  // Get the current logged in user from the database using the sessionToken value
  const user = sessionCookie && (await getUser(sessionCookie.value));

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <nav className={styles.nav}>
            <div className={styles.navLinks}>
              <Link href="/">Home</Link>
              <Link href="/events">Upcoming Events</Link>
              {user && <LogoutButton />}
              <div className={styles.userLinks}>
                {user ? (
                  <>
                    <Link href={`/profile/${user.username}`}>
                      {user.username}
                    </Link>
                    <Link href="/post">Post Events</Link>
                    <Link href="/comments">Comments</Link>
                  </>
                ) : (
                  <>
                    <Link href="/register">Register</Link>
                    <Link href="/login">Login</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
