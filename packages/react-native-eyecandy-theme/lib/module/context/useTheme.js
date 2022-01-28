import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
export default function useTheme(selector) {
  const theme = useContext(ThemeContext);

  if (selector) {
    return selector(theme);
  }

  return theme;
}
//# sourceMappingURL=useTheme.js.map