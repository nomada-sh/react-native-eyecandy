import useTheme from './useTheme';

import { ThemeTypography } from '../typography';

export default function useTypography(): ThemeTypography;

export default function useTypography<T>(
  selector: (typography: ThemeTypography) => T,
): T;

export default function useTypography<T>(
  selector?: (typography: ThemeTypography) => T,
): T | ThemeTypography {
  const theme = useTheme();

  if (selector) {
    return selector(theme.typography);
  }

  return theme.typography;
}
