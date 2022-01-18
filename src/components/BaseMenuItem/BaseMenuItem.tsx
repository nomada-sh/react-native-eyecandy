import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import IconButton, { IconButtonProps } from '../IconButton';
import { useRippleColor, useTheme } from '../../hooks';

export interface BaseMenuItemProps {
  style?: StyleProp<ViewStyle>;
  icon?: IconButtonProps['icon'];
  iconColor?: string;
  iconBackgroundColor?: string;
  separator?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

function BaseMenuItem({
  style,
  icon,
  iconColor,
  iconBackgroundColor,
  separator = false,
  onPress,
  children,
}: BaseMenuItemProps) {
  const { palette } = useTheme();
  const rippleColor = useRippleColor(palette.background.container);

  return (
    <Pressable
      android_ripple={{
        color: rippleColor.string(),
      }}
      style={[
        {
          backgroundColor: palette.background.container,
        },
        styles.container,
        style,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && (
          <IconButton
            variant="transparent-rounded"
            style={styles.icon}
            buttonStyle={{
              backgroundColor: iconBackgroundColor,
            }}
            icon={icon}
            iconColor={iconColor}
            size={40}
            iconSize={22}
            disabled
            hideDisabledOverlay
          />
        )}
        {children}
      </View>
      {separator ? (
        <View
          style={[
            {
              backgroundColor: palette.divider,
            },
            styles.separator,
          ]}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    flex: 1,
  },
  icon: {
    marginEnd: 16,
  },
  separator: {
    height: 1,
    width: '100%',
  },
});

export default BaseMenuItem;
