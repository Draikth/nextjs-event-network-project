import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <main>
        <hgroup>
          <h1>Welcome to the Event Network Project!</h1>
          <p>A place to find what might be happening around the city!</p>
        </hgroup>
      </main>
    </div>
  );
}
