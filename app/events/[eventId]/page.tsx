import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventInsecure } from '../../../database/events';

type Props = {
  params: {
    eventId: string; // Correct the key to match the dynamic route parameter
  };
};

function formatDuration(duration: number | null): string {
  if (duration === null) {
    return 'N/A';
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

export default async function EventPage(props: Props) {
  // Extract and convert the eventId
  const { eventId } = props.params;
  const id = Number(eventId); // Convert to number

  const singleEvent = await getEventInsecure(id);

  if (!singleEvent) {
    console.error('Event not found for ID:', id); // Log the event not found error
    notFound();
    return;
  }

  return (
    <div>
      <h1>{singleEvent.name}</h1>

      <div>
        <img src={singleEvent.image} alt={singleEvent.name} />
        <br />
        {singleEvent.type}
        <br />
        {singleEvent.category}
        <br />
        {singleEvent.date.toLocaleDateString()}
        <br />
        {formatDuration(singleEvent.duration)}
        <br />
        {singleEvent.location}
        <br />
        {singleEvent.description}
        <br />
        {singleEvent.organizerUrl}
        <br />
      </div>
      <div>
        <br />
        <Link href="/events">Back to Upcoming Events</Link>
      </div>
    </div>
  );
}
