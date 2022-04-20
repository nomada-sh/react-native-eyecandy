import { ThemeBodyFontSizes } from '@nomada-sh/react-native-eyecandy-theme';

export default function isThemeTextColorsChoices(
  value: any,
): value is keyof ThemeBodyFontSizes {
  switch (value) {
    case 'xsmall':
    case 'small':
    case 'medium':
    case 'large':
    case 'xlarge':
      return true;
  }

  return false;
}
