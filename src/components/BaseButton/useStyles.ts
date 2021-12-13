import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Color from 'color';

import { useTheme } from '../../hooks';
import type { ButtonColors } from '../../theme';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
}: {
  color?: ButtonColors;
  inverse?: boolean;
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
}) {
  const theme = useTheme();
  const { background, foreground } = theme.components.button[color];

  const borderRadius = /([a-z]+-)?rounded$/.test(variant) ? height / 2 : 12;
  let backgroundColor = inverse ? foreground : background;
  const rippleColor = Color(backgroundColor).isDark()
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)';
  backgroundColor = /^transparent(-[a-z]+)?/.test(variant)
    ? 'transparent'
    : backgroundColor;

  let textColor = inverse ? background : foreground;

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          height,
          borderRadius,
          overflow: 'hidden',
        },
        button: {
          flex: 1,
          borderRadius,
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          color: textColor,
        },
        ripple: {
          color: rippleColor,
        },
      }),
    [height, borderRadius, backgroundColor, textColor, rippleColor],
  );
}
