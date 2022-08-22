import { isThemeTextColorsChoices, ThemeTextColorsChoices, useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { LiteralUnion } from 'type-fest';

export function useIconColor(color: LiteralUnion<ThemeTextColorsChoices, string> = 'default') {
  const { colors } = useTheme();

  return isThemeTextColorsChoices(color)
    ? colors.text[color].normal
    : color;
}