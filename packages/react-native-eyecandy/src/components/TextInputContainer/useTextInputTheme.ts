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
  placeholderTextColor: string;
  iconColor: string;
};

export type UseThemeInputThemeProps = {
  color?: ThemeInputColorChoices;
  error?: boolean;
};

export type UseThemeInputThemeReturnType = {
  theme: Theme;
  setFocused: (focused: boolean) => void;
};

export default function useTextInputTheme({
  color: colorProp = 'default',
  error,
}: UseThemeInputThemeProps): UseThemeInputThemeReturnType {
  const color: ThemeInputColorChoices = error ? 'error' : colorProp;
  const [focused, setFocused] = useState(false);

  const { colors, fontSize } = useTheme(t => ({
    palette: t.palette,
    colors: t.colors.input[color],
    fontSize: t.typography.body.fontSize,
  }));

  // const errorTextColor = palette.error[200];

  const backgroundColor = focused
    ? colors.focused.background
    : colors.background;

  const textColor = colors.foreground;
  const placeholderTextColor = colors.placeholder;
  const borderColor = focused ? colors.focused.indicator : colors.border;
  const iconColor = focused ? borderColor : textColor;

  return {
    setFocused,
    theme: {
      backgroundColor,
      borderColor,
      textColor,
      textSize: fontSize.medium,
      placeholderTextColor,
      iconColor,
    },
  };
}
