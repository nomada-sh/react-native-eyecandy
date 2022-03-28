import { useState } from 'react';

import {
  ThemeInputColorChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

export type Theme = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  textSize: number;
  errorTextColor: string;
  placeholderTextColor: string;
  iconColor: string;
};

export type UseThemeInputThemeProps = {
  color?: ThemeInputColorChoices;
  withError?: boolean;
};

export type UseThemeInputThemeReturnType = {
  theme: Theme;
  setFocused: (focused: boolean) => void;
};

export default function useTextInputTheme({
  color = 'default',
  withError,
}: UseThemeInputThemeProps): UseThemeInputThemeReturnType {
  const [focused, setFocused] = useState(false);

  const { palette, colors, fontSize } = useTheme(t => ({
    palette: t.palette,
    colors: t.colors.input[color],
    fontSize: t.typography.body.fontSize,
  }));

  const errorTextColor = palette.error[200];

  const backgroundColor = focused
    ? colors.focused.background
    : colors.background;

  let textColor = colors.foreground;
  textColor = withError ? errorTextColor : textColor;

  let placeholderTextColor = colors.placeholder;
  placeholderTextColor = withError ? errorTextColor : placeholderTextColor;

  let borderColor = focused ? colors.focused.indicator : backgroundColor;
  borderColor = withError ? errorTextColor : borderColor;

  let iconColor = focused ? borderColor : textColor;

  return {
    setFocused,
    theme: {
      backgroundColor,
      borderColor,
      textColor,
      textSize: fontSize.medium,
      errorTextColor,
      placeholderTextColor,
      iconColor,
    },
  };
}
