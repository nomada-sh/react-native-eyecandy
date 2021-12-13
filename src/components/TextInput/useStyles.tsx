import React, { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks';

import type { TextInputIcon, TextInputProps } from './typings';

export default function useStyles({
  color = 'default',
  focused,
  widthPaddingEnd,
  widthPaddingStart,
  value,
  dirty = false,
  hasError = false,
  fullWidth = true,
}: {
  color?: TextInputProps['color'];
  focused: boolean;
  widthPaddingEnd: boolean;
  widthPaddingStart: boolean;
  value?: string;
  dirty?: boolean;
  hasError?: boolean;
  fullWidth?: boolean;
}) {
  const { components, palette, typography, dark } = useTheme();
  const fontSize = typography.body.fontSize;
  const colors = components.input[color];

  const empty = dirty || value === undefined || value === '';

  const padding = 16;

  const errorColor = palette.error[200];

  const backgroundColor = focused
    ? colors.focused.background
    : colors.background;

  let textColor = colors.foreground;
  textColor = hasError ? errorColor : textColor;

  let placeholderColor = colors.placeholder;
  placeholderColor = hasError ? errorColor : placeholderColor;

  let indicatorColor = focused ? colors.focused.indicator : backgroundColor;
  indicatorColor = hasError ? errorColor : indicatorColor;

  let iconColor = focused ? indicatorColor : textColor;

  const keyboardAppearance: TextInputProps['keyboardAppearance'] = dark
    ? 'dark'
    : 'light';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: fullWidth ? '100%' : undefined,
        },
        inputContainer: {
          height: 56,
          borderWidth: 1,
          backgroundColor,
          borderRadius: 12,
          overflow: 'hidden',
          flexDirection: 'row',
          borderStyle: 'solid',
          borderColor: indicatorColor,
        },
        iconContainer: {
          justifyContent: 'center',
          paddingHorizontal: padding,
        },
        icon: {
          fontSize: 20,
          color: iconColor,
        },
        input: {
          flex: 1,
          color: textColor,
          fontSize: fontSize.medium,
          fontWeight: empty ? 'normal' : '700',
          paddingEnd: widthPaddingEnd ? padding : 0,
          paddingStart: widthPaddingStart ? padding : 0,
        },
        inputPlaceholder: {
          color: placeholderColor,
        },
      }),
    [
      fullWidth,
      backgroundColor,
      indicatorColor,
      iconColor,
      textColor,
      fontSize.medium,
      empty,
      widthPaddingEnd,
      widthPaddingStart,
      placeholderColor,
    ],
  );

  const renderIcon = useCallback(
    (Icon: TextInputIcon, stroke?: string) => {
      return (
        <Icon
          size={styles.icon.fontSize}
          stroke={stroke || styles.icon.color}
        />
      );
    },
    [styles.icon.color, styles.icon.fontSize],
  );

  return {
    styles,
    keyboardAppearance,
    renderIcon,
  };
}
