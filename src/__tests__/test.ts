import { ArtigioCmsParser } from '../index';

test('Test', () => {
  expect(new ArtigioCmsParser().getIsFile()).toBe(false);
});
