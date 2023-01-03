import { Platform, StyleSheet } from 'react-native';

import {
  ThemeInputColorChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { TextInputStyleProps } from './types';

interface UseStylesProps extends TextInputStyleProps {
  focused?: boolean;
  removeDefaultLeftPadding?: boolean;
  removeDefaultRightPadding?: boolean;
  editable?: boolean;
  hasLabel: boolean;
  multiline?: boolean;
}

export default function useStyles({
  color = 'default',
  inputDefaultHorizontalPadding = 16,
  height: minHeight,
  fullWidth,
  error,
  focused,
  inputPaddingLeft,
  inputPaddingRight,
  removeDefaultLeftPadding,
  removeDefaultRightPadding,
  marginBottom,
  marginTop,
  flex,
  editable,
  multiline,
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
  const notEditableColor = Color(backgroundColor).fade(0.4).string();

  let paddingLeft = inputDefaultHorizontalPadding;
  if (removeDefaultLeftPadding) paddingLeft = 0;
  if (inputPaddingLeft !== undefined) paddingLeft = inputPaddingLeft;

  let paddingRight = inputDefaultHorizontalPadding;
  if (removeDefaultRightPadding) paddingRight = 0;
  if (inputPaddingRight !== undefined) paddingRight = inputPaddingRight;

  return StyleSheet.create({
    rootContainer: {
      flex,
      width: fullWidth ? '100%' : undefined,
      backgroundColor,
      borderColor,
      marginTop,
      marginBottom,
      minHeight,
    },
    inputContainer: {},
    labelContainer: {
      paddingLeft,
      paddingRight,
    },
    label: {
      color: textColor,
      fontSize: fontSize.small,
    },
    input: {
      color: textColor,
      fontSize: fontSize.medium,
      paddingLeft,
      paddingRight,
      paddingTop: Platform.OS === 'ios' && multiline ? 8 : 0,
      paddingBottom: multiline ? 8 : 0,
    },
    inputRight: {
      paddingLeft: removeDefaultRightPadding
        ? inputDefaultHorizontalPadding
        : 0,
      paddingRight: inputDefaultHorizontalPadding,
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
    disabled: {
      backgroundColor: !editable ? notEditableColor : undefined,
    },
  });
}
