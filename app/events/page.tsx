import Link from 'next/link';
import { getEventsInsecure } from '../../database/events';

export const metadata = {
  title: 'Upcoming Events',
  description: 'Upcoming events around the city',
};

export default async function EventsPage() {
  const events = await getEventsInsecure();
  return (
    <div>
      <h1>These Are Our Currently Listed Upcoming Events</h1>
      <div>
        <br />
        {events.map((event) => (
          <div key={`events-${event.id}`}>
            <Link href={`/events/${event.id}`}>
              <div>
                {event.name}
                <br />
                {event.type}
                <br />
                {event.date.toLocaleDateString()}
                <br />
                {event.location}
                <br />
                <img src={event.image} alt={event.name} />
                {/* temporary for now */}
                <br />
                {event.category}
                <br />
                <br />
              </div>
              <br />
              <br />
            </Link>
          </div>
        ))}
        <br />
      </div>
      <br />
      <div>
        <Link href="/">Back to Home page</Link>
      </div>
    </div>
  );
}
