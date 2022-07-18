import { StyleSheet } from 'react-native';

import {
  ThemeInputColorChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

import { TextInputStyleProps } from './types';

interface UseStylesProps extends TextInputStyleProps {
  focused?: boolean;
  removeDefaultLeftPadding?: boolean;
  removeDefaultRightPadding?: boolean;
}

export default function useStyles({
  color = 'default',
  inputDefaultHorizontalPadding = 16,
  height = 56,
  fullWidth,
  error,
  focused,
  inputPaddingLeft,
  inputPaddingRight,
  removeDefaultLeftPadding,
  removeDefaultRightPadding,
  marginBottom,
  marginTop,
}: UseStylesProps) {
  const colorChoice: ThemeInputColorChoices = error ? 'error' : color;

  const { colors, fontSize } = useTheme(t => ({
    palette: t.palette,
    colors: t.colors.input[colorChoice],
    fontSize: t.typography.body.fontSize,
  }));

  const backgroundColor = focused
    ? colors.focused.background
    : colors.background;
  const textColor = colors.foreground;
  const placeholderTextColor = colors.placeholder;
  const borderColor = focused ? colors.focused.indicator : colors.border;
  const iconColor = focused ? borderColor : textColor;
  const selectionColor = colors.focused.indicator;

  let paddingLeft = inputDefaultHorizontalPadding;
  if (removeDefaultLeftPadding) paddingLeft = 0;
  if (inputPaddingLeft !== undefined) paddingLeft = inputPaddingLeft;

  let paddingRight = inputDefaultHorizontalPadding;
  if (removeDefaultRightPadding) paddingRight = 0;
  if (inputPaddingRight !== undefined) paddingRight = inputPaddingRight;

  return StyleSheet.create({
    container: {
      flex: 1,
      width: fullWidth ? '100%' : undefined,
      backgroundColor,
      borderColor,
      marginTop,
      marginBottom,
      height,
    },
    input: {
      color: textColor,
      fontSize: fontSize.medium,
      paddingLeft,
      paddingRight,
    },
    selection: {
      color: selectionColor,
    },
    icon: {
      color: iconColor,
    },
    placeholder: {
      color: placeholderTextColor,
    },
  });
}
