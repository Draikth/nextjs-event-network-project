import { Sql } from 'postgres';

const events = [
  {
    id: 1,
    user_id: 1,
    name: 'Vienna Music Festival',
    type: 'Concert',
    date: '2024-08-10 18:00:00',
    location: 'Stadtpark, Vienna',
    duration: 180,
    entry_fee: 50,
    category: 'Music',
    description: 'A grand music festival featuring top artists.',
    image: 'http://example.com/images/vienna_music_festival.jpg',
    organizer_url: 'http://example.com/organizers/vienna_music_festival',
    age_restriction: false,
    archived: false,
  },
  {
    id: 2,
    user_id: 2,
    name: 'Vienna Tech Conference 2024',
    type: 'Conference',
    date: '2024-09-15 09:00:00',
    location: 'Tech Gate, Vienna',
    duration: 480,
    entry_fee: 200,
    category: 'Technology',
    description:
      'Annual tech conference covering the latest trends in technology.',
    image: 'http://example.com/images/vienna_tech_conference.jpg',
    organizer_url: 'http://example.com/organizers/vienna_tech_conference',
    age_restriction: false,
    archived: false,
  },
  {
    id: 3,
    user_id: 3,
    name: 'Vienna Art Exhibition',
    type: 'Exhibition',
    date: '2024-07-20 10:00:00',
    location: 'Albertina Museum, Vienna',
    duration: 300,
    entry_fee: 20,
    category: 'Art',
    description: 'Exhibition of contemporary art by local artists.',
    image: 'http://example.com/images/vienna_art_exhibition.jpg',
    organizer_url: 'http://example.com/organizers/vienna_art_exhibition',
    age_restriction: false,
    archived: false,
  },
  {
    id: 4,
    user_id: 4,
    name: 'Vienna Marathon 2024',
    type: 'Sport',
    date: '2024-10-05 06:00:00',
    location: 'Vienna City Marathon Route',
    duration: 300,
    entry_fee: 100,
    category: 'Sports',
    description: 'Annual city marathon with thousands of participants.',
    image: 'http://example.com/images/vienna_marathon.jpg',
    organizer_url: 'http://example.com/organizers/vienna_marathon',
    age_restriction: false,
    archived: false,
  },
  {
    id: 5,
    user_id: 5,
    name: 'Vienna Food Festival',
    type: 'Festival',
    date: '2024-11-12 12:00:00',
    location: 'Naschmarkt, Vienna',
    duration: 240,
    entry_fee: 30,
    category: 'Food',
    description: 'Festival showcasing diverse culinary delights.',
    image: 'http://example.com/images/vienna_food_festival.jpg',
    organizer_url: 'http://example.com/organizers/vienna_food_festival',
    age_restriction: false,
    archived: false,
  },
  {
    id: 6,
    user_id: 1,
    name: 'Vienna Science Fair',
    type: 'Fair',
    date: '2024-08-25 10:00:00',
    location: 'Messe Wien Exhibition & Congress Center',
    duration: 360,
    entry_fee: 10,
    category: 'Science',
    description: 'Interactive science fair with exhibits and demonstrations.',
    image: 'http://example.com/images/vienna_science_fair.jpg',
    organizer_url: 'http://example.com/organizers/vienna_science_fair',
    age_restriction: false,
    archived: false,
  },
  {
    id: 7,
    user_id: 2,
    name: 'Vienna Book Fair',
    type: 'Fair',
    date: '2024-09-05 09:00:00',
    location: 'Vienna International Centre',
    duration: 480,
    entry_fee: 15,
    category: 'Literature',
    description: 'Fair featuring book sales, author signings, and readings.',
    image: 'http://example.com/images/vienna_book_fair.jpg',
    organizer_url: 'http://example.com/organizers/vienna_book_fair',
    age_restriction: false,
    archived: false,
  },
  {
    id: 8,
    user_id: 3,
    name: 'Vienna Film Festival',
    type: 'Festival',
    date: '2024-12-01 14:00:00',
    location: 'Stadtkino, Vienna',
    duration: 600,
    entry_fee: 25,
    category: 'Film',
    description: 'Screening of independent and international films.',
    image: 'http://example.com/images/vienna_film_festival.jpg',
    organizer_url: 'http://example.com/organizers/vienna_film_festival',
    age_restriction: true,
    archived: false,
  },
  {
    id: 9,
    user_id: 4,
    name: 'Vienna Dance Workshop',
    type: 'Workshop',
    date: '2024-07-15 16:00:00',
    location: 'DanceArts, Vienna',
    duration: 120,
    entry_fee: 40,
    category: 'Dance',
    description: 'Interactive dance workshop with professional instructors.',
    image: 'http://example.com/images/vienna_dance_workshop.jpg',
    organizer_url: 'http://example.com/organizers/vienna_dance_workshop',
    age_restriction: false,
    archived: false,
  },
  {
    id: 10,
    user_id: 5,
    name: 'Vienna Gaming Expo',
    type: 'Expo',
    date: '2024-11-20 10:00:00',
    location: 'Austria Center Vienna',
    duration: 480,
    entry_fee: 60,
    category: 'Gaming',
    description: 'Expo featuring the latest in video games and technology.',
    image: 'http://example.com/images/vienna_gaming_expo.jpg',
    organizer_url: 'http://example.com/organizers/vienna_gaming_expo',
    age_restriction: false,
    archived: false,
  },
];

export async function up(sql: Sql) {
  for (const event of events) {
    await sql`
      INSERT INTO
        events (
          user_id,
          name,
          type,
          date,
          location,
          duration,
          entry_fee,
          category,
          description,
          image,
          organizer_url,
          age_restriction,
          archived
        )
      VALUES
        (
          ${event.user_id},
          ${event.name},
          ${event.type},
          date (
            ${event.date}
          ),
          ${event.location},
          ${event.duration},
          ${event.entry_fee},
          ${event.category},
          ${event.description},
          ${event.image},
          ${event.organizer_url},
          ${event.age_restriction},
          ${event.archived}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const event of events) {
    await sql`
      DELETE FROM events
      WHERE
        id = ${event.id}
    `;
  }
}
