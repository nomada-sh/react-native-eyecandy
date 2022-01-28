import wrap from './wrap';

test('should get correct wrapped values', () => {
  expect(wrap(10, -1)).toBe(9);
  expect(wrap(10, 0)).toBe(0);
  expect(wrap(10, 10)).toBe(0);
  expect(wrap(10, -2)).toBe(8);
  expect(wrap(10, 20)).toBe(0);
});
