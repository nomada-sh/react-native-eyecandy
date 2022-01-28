import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';

export default function useTheme() {
  return useContext(ThemeContext);
}
