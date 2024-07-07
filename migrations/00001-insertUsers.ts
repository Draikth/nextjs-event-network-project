import { Sql } from 'postgres';

const users = [
  {
    id: 1,
    username: 'man',
    email: 'man@man.com',
    password: 'manna',
    password_hash:
      '$2a$12$cV2HA84ZMALtxXia2t8ulO.9mV7W.GitRrRHgL10ajT521KKkr4.y',
  },
  {
    id: 2,
    username: 'fish',
    email: 'fish@water.com',
    password: 'fishing',
    password_hash:
      '$2a$12$KYFy6GWsy7D7CgcAWk3hnOXaXFCgkVG6zjkz2P9H70HtBCX1Dit2u',
  },
  {
    id: 3,
    username: 'eventor',
    email: 'eventor@events.com',
    password: 'eventing',
    password_hash:
      '$2a$12$PYUUFgXcRdaOPoAKzJSylunLXp9C565yzPo.UzDct3JO9X1vhNJU.',
  },
  {
    id: 4,
    username: 'festifan',
    email: 'fest@festi.com',
    password: 'fest4life',
    password_hash:
      '$2a$12$8flhz0XZBsuCyfFbVztcKufVkxR5kyUBsWGwU2oWkmf0RM0mbs.n6',
  },
  {
    id: 5,
    username: 'ev-party',
    email: 'ev@party.com',
    password: 'partygo',
    password_hash:
      '$2a$12$PPkRD1YQHIf2duEHej4POu3BqVVCP1LoXYF1G1Ioa0PiMmSnDSfaW',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO
        users (
          username,
          email,
          password_hash
        )
      VALUES
        (
          ${user.username},
          ${user.email},
          ${user.password_hash}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
