import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Color from 'color';

import { useTheme } from '../../hooks';
import type { ButtonColors } from '../../theme';

const DARK_RIPPLE_COLOR = 'rgba(255, 255, 255, 0.1)',
  LIGHT_RIPPLE_COLOR = 'rgba(0, 0, 0, 0.1)';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
  disabled,
}: {
  color?: ButtonColors;
  inverse?: boolean;
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
  disabled?: boolean | null;
}) {
  const theme = useTheme();
  const { background, foreground } = theme.components.button[color];

  const borderRadius = /([a-z]+-)?rounded$/.test(variant) ? height / 2 : 12;

  let backgroundColor = useMemo(
    () => Color(inverse ? foreground : background).rgb(),
    [background, foreground, inverse],
  );

  const rippleColor = useMemo(
    () => (backgroundColor.isDark() ? DARK_RIPPLE_COLOR : LIGHT_RIPPLE_COLOR),
    [backgroundColor],
  );

  if (/^transparent(-[a-z]+)?/.test(variant))
    backgroundColor = backgroundColor.alpha(0);

  if (disabled)
    backgroundColor = backgroundColor.isDark()
      ? backgroundColor.alpha(0.8)
      : backgroundColor.darken(0.1).alpha(0.8);

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
          backgroundColor: backgroundColor.string(),
          justifyContent: 'center',
          alignItems: 'center',
        },
        ripple: {
          color: rippleColor,
        },
        disabled: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      }),
    [height, borderRadius, backgroundColor, rippleColor],
  );
}
