import defaultPalette from './Palette';
import createPalette from './createPalette';

test('createPalette default', () => {
  const palette = createPalette();
  expect(palette).toEqual(defaultPalette);
});

test('createPalette', () => {
  const palette = createPalette({
    error: {
      '50': 'red',
      '100': 'red',
      '200': 'red',
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
