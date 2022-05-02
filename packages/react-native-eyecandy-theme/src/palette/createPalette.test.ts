import defaultPalette from './Palette';
import createPalette from './createPalette';

test('createPalette default', () => {
  const palette = createPalette();
  expect(palette).toEqual(defaultPalette);
});

test('createPalette', () => {
  const palette = createPalette({
    palette: {
      error: {
        '50': 'red',
        '100': 'red',
        '200': 'red',
      },
    },
  });

  expect(palette).toEqual({
    ...defaultPalette,
    error: {
      ...defaultPalette.error,
      '50': 'red',
      '100': 'red',
      '200': 'red',
    },
  });
});

test('createPalette function', () => {
  const palette = createPalette({
    dark: true,
    palette: ({ dark }) => ({
      error: {
        '50': dark ? 'orange' : 'red',
        '100': dark ? 'orange' : 'red',
        '200': dark ? 'orange' : 'red',
      },
    }),
  });

  expect(palette).toEqual({
    ...defaultPalette,
    error: {
      ...defaultPalette.error,
      '50': 'orange',
      '100': 'orange',
      '200': 'orange',
    },
  });
});

test('createPalette ignore undefined', () => {
  const palette = createPalette({
    palette: {
      primary: undefined,
      secondary: undefined,
      error: undefined,
      grey: undefined,
      success: undefined,
      warning: undefined,
    },
  });

  expect(palette).toEqual(defaultPalette);
});
