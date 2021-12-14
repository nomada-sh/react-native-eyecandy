import React, { useMemo } from 'react';

import SwipeButtonBase, {
  Props as SwipeButtonBaseProps,
} from 'rn-swipe-button';

import Color from 'color';

import { useTheme } from '../../hooks';
import { StyleSheet } from 'react-native';

export interface SwipeButtonProps extends SwipeButtonBaseProps {}

function SwipeButton({
  titleStyles,
  containerStyles,
  ...props
}: SwipeButtonProps) {
  const { typography, components } = useTheme();
  const colors = components.button.primary;

  const fillColor = useMemo(
    () => Color(colors.background).rgb().darken(0.3).alpha(0.8).string(),
    [colors.background],
  );

  const thumbColor = useMemo(
    () => Color(colors.background).darken(0.5).string(),
    [colors.background],
  );

  return (
    <SwipeButtonBase
      title=""
      containerStyles={StyleSheet.flatten([
        {
          borderWidth: 0,
          width: '100%',
        },
        containerStyles,
      ])}
      titleStyles={StyleSheet.flatten([
        {
          fontSize: typography.body.fontSize.medium,
          fontWeight: 'bold',
          color: colors.foreground,
        },
        titleStyles,
      ])}
      railBackgroundColor={colors.background}
      railFillBackgroundColor={fillColor}
      railFillBorderColor={fillColor}
      thumbIconBackgroundColor={thumbColor}
      thumbIconBorderColor={thumbColor}
      {...props}
    />
  );
}

export default SwipeButton;
