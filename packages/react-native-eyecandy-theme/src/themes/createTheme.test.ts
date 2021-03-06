import { Palette } from '../palette';
import { Typography } from '../typography';

import createTheme from './createTheme';
import { Theme } from './types';

test('createTheme', () => {
  const theme = createTheme();

  expect(theme).toEqual<Theme>({
    dark: false,
    palette: Palette,
    typography: Typography,
    colors: expect.any(Object),
  });
});

test('createTheme dark', () => {
  const theme = createTheme({
    dark: true,
  });

  expect(theme).toEqual<Theme>({
    dark: true,
    palette: Palette,
    typography: Typography,
    colors: expect.any(Object),
  });
});

test('createTheme custom palette', () => {
  const customPalette = {
    primary: {
      100: '#e5f7fa',
      200: '#9ae2ed',
      300: '#68d3e4',
      400: '#36c5db',
      500: '#04b7d2',
    },
    secondary: {
      100: '#e5eef4',
      200: '#99bdd4',
      300: '#669cbf',
      400: '#327baa',
      500: '#005b95',
    },
  };

  const theme = createTheme({
    palette: customPalette,
  });

  expect(theme.palette.primary).toEqual<Theme['palette']['primary']>({
    ...Palette.primary,
    ...customPalette.primary,
  });

  expect(theme.palette.secondary).toEqual<Theme['palette']['secondary']>({
    ...Palette.secondary,
    ...customPalette.secondary,
  });
});
