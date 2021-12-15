import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import Color from 'color';

import { useTheme } from '../../hooks';
import { getRippleColor } from '../../utils';
import type { ButtonColors } from '../../theme';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
  disabled,
  fullwidth = true,
}: {
  color?: ButtonColors;
  inverse?: boolean;
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
  disabled?: boolean | null;
  fullwidth?: boolean;
}) {
  const { components } = useTheme();
  const { background, foreground } = components.button[color];

  const { borderRadius, backgroundColor, rippleColor, disabledColor } =
    useMemo(() => {
      const borderRadius = /([a-z]+-)?rounded$/.test(variant) ? height / 2 : 12;

      let backgroundColor = Color(inverse ? foreground : background).rgb();

      const rippleColor = getRippleColor(backgroundColor);

      if (/^transparent(-[a-z]+)?/.test(variant))
        backgroundColor = backgroundColor.alpha(0);

      let disabledColor = backgroundColor.fade(0.4);

      return {
        borderRadius,
        backgroundColor,
        rippleColor,
        disabledColor,
      };
    }, [background, foreground, height, inverse, variant]);

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          height,
          borderRadius,
          overflow: 'hidden',
          width: fullwidth ? '100%' : undefined,
        },
        button: {
          flex: 1,
          borderRadius,
          backgroundColor: backgroundColor.string(),
          justifyContent: 'center',
          alignItems: 'center',
        },
        ripple: {
          color: rippleColor.string(),
        },
        disabled: {
          backgroundColor: disabled ? disabledColor.string() : undefined,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        loadingContainer: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
        },
        loading: {
          color: inverse ? background : foreground,
        },
      }),
    [
      height,
      borderRadius,
      fullwidth,
      backgroundColor,
      rippleColor,
      disabled,
      disabledColor,
      inverse,
      background,
      foreground,
    ],
  );
}
