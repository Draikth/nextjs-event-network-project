import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div>
      Sorry this Event was not found or doesn't exist in our records
      <div>
        <Link href="/events">Return to the Upcoming Events Page</Link>
        <br />
        <Link href="/">Return to the Home page</Link>
      </div>
    </div>
  );
}
