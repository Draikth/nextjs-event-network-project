import { expect, test } from '@jest/globals';
import { add } from '../math';

test('adds two numbers', () => {
  expect(add(1, 2)).toBe(3);
  expect(add(100, 200)).toBe(300);
});

test('throws an error when arguments are not numbers', () => {
  // @ts-expect-error testing incorrect arguments
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  // @ts-expect-error testing incorrect arguments
  expect(() => add('asd', '1')).toThrow('Pass only numbers!');
});
