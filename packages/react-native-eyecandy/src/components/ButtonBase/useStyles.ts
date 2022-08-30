import { StyleSheet } from 'react-native';

import {
  ThemeButtonColorChoices,
  useTheme,
} from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { getRippleColor } from '../../utils';

export default function useStyles({
  color = 'default',
  inverse = false,
  variant = 'default',
  height = 56,
  disabled,
  fullwidth = false,
  transparent = false,
  outlined = false,
  flex,
}: {
  color?: ThemeButtonColorChoices;
  inverse?: boolean;
  variant?: 'default' | 'rounded' | `squared`;
  height?: number;
  disabled?: boolean | null;
  fullwidth?: boolean;
  transparent?: boolean;
  outlined?: boolean;
  flex?: number;
}) {
  const { colors } = useTheme();
  const { background, foreground } = colors.button[color];

  let borderWidth = 0;
  let borderColor = undefined;
  let borderRadius = 0;

  switch (variant) {
    case 'default':
      borderRadius = 12;
      break;
    case 'rounded':
      borderRadius = height / 2;
      break;
    default:
      borderRadius = 0;
  }

  let backgroundColor = Color(inverse ? foreground : background).rgb();
  let foregroundColor = Color(inverse ? background : foreground).rgb();

  let disabledColor = backgroundColor.fade(0.4);

  let rippleColor = getRippleColor(backgroundColor).string();

  if (outlined) {
    borderWidth = 1;
    borderColor = inverse ? background : foreground;
    backgroundColor = backgroundColor.alpha(0);
  }

  if (transparent) {
    backgroundColor = backgroundColor.alpha(0);
    rippleColor = getRippleColor(colors.background.default.container).string();
  }

  return StyleSheet.create({
    container: {
      flex,
      width: fullwidth ? '100%' : undefined,
      height,
      borderRadius,
      overflow: 'hidden',
      borderWidth,
      borderColor,
      backgroundColor: backgroundColor.string(),
    },
    pressable: {
      flex: 1,
      borderRadius,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ripple: {
      color: rippleColor,
    },
    activeOpacity: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: rippleColor,
      flex: 1,
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
      color: foregroundColor.string(),
    },
  });
}
