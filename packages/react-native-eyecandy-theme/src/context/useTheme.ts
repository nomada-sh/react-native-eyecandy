import {useContext} from 'react';

import {ThemeContext} from './ThemeProvider';
import {Theme} from '../themes';

export default function useTheme(): Theme;

export default function useTheme<T>(selector: (theme: Theme) => T): T;

export default function useTheme<T>(selector?: (theme: Theme) => T): T | Theme {
  const theme = useContext(ThemeContext);

  if (selector) {
    return selector(theme);
  }

  return theme;
}
