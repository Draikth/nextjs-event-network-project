import Link from 'next/link';
import { getEventsInsecure } from '../../database/events';

export const metadata = {
  title: 'Upcoming Events',
  description: 'Upcoming events around the city',
};

function formatDuration(duration: number | null): string {
  if (duration === null) {
    return 'N/A';
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

export default async function EventsPage() {
  const events = await getEventsInsecure();
  return (
    <div>
      <h1>These Are Our Currently Available Products</h1>
      <div>
        <br />
        {events.map((event) => {
          return (
            <div key={`events-${event.id}`}>
              <div>
                {event.name}
                <br />
                {event.type}
                <br />
                {event.date.toLocaleDateString()}
                <br />
                {event.location}
                <br />
                {formatDuration(event.duration)}
                <br />
                {event.image}
                <br />
                {event.category}
                <br />

                <br />
              </div>
              <br />
              <br />
            </div>
          );
        })}
        <br />
      </div>
      <br />
      <div>
        <Link href="/">Back to Home page</Link>
      </div>
    </div>
  );
}
