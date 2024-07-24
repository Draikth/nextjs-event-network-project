import Link from 'next/link';
import { SiteEvent } from '../../../database/events';
import { User } from '../../../database/users';

type Prop = {
  events: SiteEvent[];
  user: Pick<User, 'username'>;
};

export default function UserPostedEvents(props: Prop) {
  return (
    <>
      <h2> Posted Events for {props.user.username}</h2>

      <div>
        <div>
          {props.events.length === 0 ? (
            'No Events posted yet'
          ) : (
            <ul>
              {props.events.map((event) => (
                <li key={`events-${event.id}`}>
                  <Link href={`/events/${event.id}`}>{event.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
