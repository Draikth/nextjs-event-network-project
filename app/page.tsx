import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <main>
        <hgroup className={styles.hgroupCentered}>
          <h1>Welcome to the Event Network Project!</h1>
          <p>A place to find what might be happening around the city!</p>
        </hgroup>
        <div className={styles.imageTextContainer}>
          <Image
            src="/images/outdoor-event.webp"
            alt="Outdoor event with crowd"
            width={500}
            height={500}
          />
        </div>
        <div>
          <p>
            The Event Network Project aims to serve as a reference point for
            finding out about events happening around the city, posted by our
            registered users.
          </p>
        </div>
      </main>
    </div>
  );
}
