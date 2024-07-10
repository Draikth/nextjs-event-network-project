import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <main>
        <hgroup>
          <h1>Welcome to the Event Network Project!</h1>
          <p>A place to find what might be happening around the city!</p>
        </hgroup>
        <br />
        <div>
          <Image
            src="/images/outdoor-event.webp"
            alt="Outdoor event with crowd"
            width={620}
            height={620}
          />
        </div>
      </main>
    </div>
  );
}
