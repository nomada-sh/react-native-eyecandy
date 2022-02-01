import { StyleSheet } from 'react-native';

import Color from 'color';

import {
  ThemeButtonColorChoices,
  useColors,
} from '@nomada-sh/react-native-eyecandy-theme';
import { getRippleColor } from '../../utils';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
  disabled,
  fullwidth = true,
}: {
  color?: ThemeButtonColorChoices;
  inverse?: boolean;
  variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
  height?: number;
  disabled?: boolean | null;
  fullwidth?: boolean;
}) {
  const colors = useColors(c => c.button);
  const { background, foreground } = colors[color];

  const borderRadius = /([a-z]+-)?rounded$/.test(variant) ? height / 2 : 12;

  let backgroundColor = Color(inverse ? foreground : background).rgb();

  const rippleColor = getRippleColor(backgroundColor);

  let disabledColor = backgroundColor.fade(0.4);

  if (/^transparent(-[a-z]+)?/.test(variant)) {
    backgroundColor = backgroundColor.alpha(0);
  }

  return StyleSheet.create({
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
  });
}
