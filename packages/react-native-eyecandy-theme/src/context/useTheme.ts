import { useContext } from 'react';

import { Theme } from '../themes';

import { ThemeContext } from './ThemeProvider';

function useTheme(): Theme;

function useTheme<T>(selector: (theme: Theme) => T): T;

function useTheme<T>(selector?: (theme: Theme) => T): T | Theme {
  const theme = useContext(ThemeContext);

  if (selector) {
    return selector(theme);
  }

  return theme;
}

export default useTheme;
