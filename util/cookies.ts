export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // this is 24 hours
  sameSite: 'lax', // for cross site scripting
} as const;
