import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import {
  ThemeBadgeColorChoices,
  useColors,
} from '@nomada-sh/react-native-eyecandy-theme';

type AnchorOrigin = {
  horizontal: 'left' | 'right';
  vertical: 'top' | 'bottom';
};

export interface BadgeProps extends ViewProps {
  color?: ThemeBadgeColorChoices;
  badgeProps?: ViewProps;
  badgeStyle?: ViewProps['style'];
  size?: number;
  anchorOrigin?: AnchorOrigin;
  hidden?: boolean;
}

const DEFAULT_BADGE_PROPS: ViewProps = {};

const defaultAnchorOrigin: AnchorOrigin = {
  horizontal: 'right',
  vertical: 'bottom',
};

export function Badge({
  color = 'default',
  size = 18,
  style,
  children,
  badgeProps: initialBadgeProps = DEFAULT_BADGE_PROPS,
  badgeStyle,
  anchorOrigin = defaultAnchorOrigin,
  hidden,
  ...props
}: BadgeProps) {
  const colors = useColors(c => c.badge[color]);

  const y = 0,
    x = 0;

  const badgeProps = {
    ...initialBadgeProps,
    style: [
      styles.badge,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.background,
        borderColor: colors.border,
        borderWidth: 3,
        top: anchorOrigin.vertical === 'top' ? y : undefined,
        bottom: anchorOrigin.vertical === 'bottom' ? y : undefined,
        left: anchorOrigin.horizontal === 'left' ? x : undefined,
        right: anchorOrigin.horizontal === 'right' ? x : undefined,
      },
      initialBadgeProps.style,
      badgeStyle,
    ],
  };

  return (
    <View style={[styles.root, style]} {...props}>
      {children}
      {hidden ? null : <View {...badgeProps} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    position: 'absolute',
  },
});
