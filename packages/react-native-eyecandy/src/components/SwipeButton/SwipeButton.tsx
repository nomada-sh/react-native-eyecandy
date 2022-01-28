import React from 'react';
import { StyleSheet } from 'react-native';

import SwipeButtonBase, {
  Props as SwipeButtonBaseProps,
} from 'rn-swipe-button';

import Color from 'color';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { ChevronRight } from '@nomada-sh/react-native-eyecandy-icons';

// TODO: Fix thumbIconComponent type.
export interface SwipeButtonProps
  extends Omit<SwipeButtonBaseProps, 'thumbIconComponent'> {}

const ThumbIcon = () => <ChevronRight stroke="white" size={40} />;

function SwipeButton({
  titleStyles,
  containerStyles,
  thumbIconStyles,
  title = '',
  ...props
}: SwipeButtonProps) {
  const { typography, colors } = useTheme(t => ({
    typography: t.typography,
    colors: t.colors.button.primary,
  }));

  const fillColor = Color(colors.background).rgb().darken(0.3).alpha(0.8).string()
  const thumbColor = Color(colors.background).darken(0.4).string()

  return (
    <SwipeButtonBase
      title={title}
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
      thumbIconStyles={StyleSheet.flatten([
        {
          borderWidth: 0,
        },
        thumbIconStyles,
      ])}
      // @ts-ignore
      thumbIconComponent={ThumbIcon}
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
