import Link from 'next/link';
import { getEventsInsecure } from '../../database/events';
import styles from './events.module.scss'; // Import the CSS module

export const metadata = {
  title: 'Upcoming Events',
  description: 'Upcoming events around the city',
};

export default async function EventsPage() {
  const events = await getEventsInsecure();
  return (
    <div className={styles.container}>
      <h1>These Are Our Currently Listed Upcoming Events</h1>
      <div>
        {events.map((event) => (
          <Link
            href={`/events/${event.id}`}
            key={`events-${event.id}`}
            passHref
          >
            <div className={styles.eventCard}>
              <img src={event.image} alt={event.name} />
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.eventType}>{event.type}</div>
                <div className={styles.eventDate}>
                  {event.date.toLocaleDateString()}
                </div>
                <div className={styles.eventLocation}>{event.location}</div>
                <div className={styles.eventCategory}>{event.category}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.backLink}>
        <Link href="/">Back to Home page</Link>
      </div>
    </div>
  );
}

// import Link from 'next/link';
// import { getEventsInsecure } from '../../database/events';
// import styles from './events.module.scss';

// export const metadata = {
//   title: 'Upcoming Events',
//   description: 'Upcoming events around the city',
// };

// export default async function EventsPage() {
//   const events = await getEventsInsecure();
//   return (
//     <div className={styles.container}>
//       <h1>These Are Our Currently Listed Upcoming Events</h1>
//       <div>
//         <br />
//         {events.map((event) => (
//           <div key={`events-${event.id}`} className={styles.eventCard}>
//             <Link href={`/events/${event.id}`}>
//               <div>
//                 {event.name}
//                 <br />
//                 {event.type}
//                 <br />
//                 {event.date.toLocaleDateString()}
//                 <br />
//                 {event.location}
//                 <br />
//                 <img src={event.image} alt={event.name} />
//                 {/* temporary for now */}
//                 <br />
//                 {event.category}
//                 <br />
//                 <br />
//               </div>
//               <br />
//               <br />
//             </Link>
//           </div>
//         ))}
//         <br />
//       </div>
//       <br />
//       <div>
//         <Link href="/">Back to Home page</Link>
//       </div>
//     </div>
//   );
// }
