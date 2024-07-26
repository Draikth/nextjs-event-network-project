import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventInsecure } from '../../../database/events';
import styles from './event.module.scss';

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
    <div className={styles.container}>
      <h1 className={styles.eventName}>{singleEvent.name}</h1>
      <div className={styles.eventCard}>
        {/* <img src={singleEvent.image} alt={singleEvent.name} /> */}
        <div className={styles.eventDetails}>
          <div className={styles.eventType}>{singleEvent.type}</div>
          <div className={styles.eventCategory}>{singleEvent.category}</div>
          <div className={styles.eventDate}>
            {singleEvent.date.toLocaleDateString()}
          </div>
          <div className={styles.eventDuration}>
            {formatDuration(singleEvent.duration)}
          </div>
          <div className={styles.eventLocation}>{singleEvent.location}</div>
          <div className={styles.eventDescription}>
            {singleEvent.description}
          </div>
          <div className={styles.eventOrganizerUrl}>
            <a
              href={singleEvent.organizerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {singleEvent.organizerUrl}
            </a>
          </div>
          <div className={styles.eventEntryFee}>€{singleEvent.entryFee}</div>
        </div>
      </div>
      <div className={styles.backLink}>
        <Link href="/events">Back to Upcoming Events</Link>
      </div>
    </div>
  );
}
