import { StyleSheet } from 'react-native';

import {
  ThemeButtonColorChoices,
  useColors,
} from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { getRippleColor } from '../../utils';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
  disabled,
  fullwidth = true,
  transparent = false,
  outlined = false,
}: {
  color?: ThemeButtonColorChoices;
  inverse?: boolean;
  variant?: 'default' | 'rounded';
  height?: number;
  disabled?: boolean | null;
  fullwidth?: boolean;
  transparent?: boolean;
  outlined?: boolean;
}) {
  const colors = useColors(c => c.button);
  const { background, foreground } = colors[color];

  let borderWidth = 0;
  let borderColor = undefined;
  const borderRadius = variant === 'rounded' ? height / 2 : 12;

  let backgroundColor = Color(inverse ? foreground : background).rgb();

  const rippleColor = getRippleColor(backgroundColor).string();

  let disabledColor = backgroundColor.fade(0.4);

  if (outlined) {
    borderWidth = 1;
    borderColor = inverse ? background : foreground;
    backgroundColor = backgroundColor.alpha(0);
  }

  if (transparent) backgroundColor = backgroundColor.alpha(0);

  return StyleSheet.create({
    container: {
      height,
      borderRadius,
      overflow: 'hidden',
      width: fullwidth ? '100%' : undefined,
      borderWidth,
      borderColor,
    },
    pressable: {
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
