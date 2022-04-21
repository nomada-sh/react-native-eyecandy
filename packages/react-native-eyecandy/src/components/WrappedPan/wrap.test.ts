import wrap from './wrap';

test('wrap', () => {
  expect(wrap(0, 0, 100)).toBe(0);
  expect(wrap(50, 0, 100)).toBe(50);
  expect(wrap(150, 0, 100)).toBe(50);
  expect(wrap(-1, 0, 100)).toBe(99);
});
