import merge from './merge';

test('merge', () => {
  const result = merge(
    {
      a: false,
      b: {
        c: 'c',
        d: {
          e: 3,
        },
      },
      f: 'f',
      g: true,
    },
    {
      b: {
        d: {
          e: 4,
        },
      },
      f: 'f2',
      g: false,
    },
  );

  expect(result).toEqual({
    a: false,
    b: {
      c: 'c',
      d: {
        e: 4,
      },
    },
    f: 'f2',
    g: false,
  });
});

test('merge ignore undefined', () => {
  const result = merge(
    {
      a: 'a',
      b: {
        c: 'c',
      },
    },
    {
      a: undefined,
      b: {
        c: undefined,
      },
    },
  );

  expect(result).toEqual({
    a: 'a',
    b: {
      c: 'c',
    },
  });
});
