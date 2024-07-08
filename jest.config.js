import nextJest from 'next/jest.js';

// https://nextjs.org/docs/app/building-your-application/testing/jest
const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/playwright/'],
};

export default createJestConfig(config);
