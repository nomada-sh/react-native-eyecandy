import { ThemeTextColorsChoices } from '@nomada-sh/react-native-eyecandy-theme';

export default function isThemeTextColorsChoices(
  value: string,
): value is ThemeTextColorsChoices {
  switch (value) {
    case 'default':
    case 'primary':
    case 'error':
    case 'greyout':
    case 'success':
    case 'warning':
      return true;
  }

  return false;
}
