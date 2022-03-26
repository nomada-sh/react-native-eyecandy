import { ThemeTypography } from '../typography';

import useTheme from './useTheme';

function useTypography(): ThemeTypography;

function useTypography<T>(selector: (typography: ThemeTypography) => T): T;

function useTypography<T>(
  selector?: (typography: ThemeTypography) => T,
): T | ThemeTypography {
  const theme = useTheme();

  if (selector) {
    return selector(theme.typography);
  }

  return theme.typography;
}

export default useTypography;
