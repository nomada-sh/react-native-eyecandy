import React, { useCallback } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import IconButton, { IconButtonProps } from '../IconButton';
import { useRippleColor } from '../../hooks';

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
  onPress: onPressProp,
  children,
}: BaseMenuItemProps) {
  const { background, divider } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default,
  }));

  const rippleColor = useRippleColor(background.container);

  const onPress = useCallback(() => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    onPressProp?.();
  }, [onPressProp]);

  return (
    <Pressable
      android_ripple={{
        color: rippleColor.string(),
      }}
      style={[
        {
          backgroundColor: background.container,
        },
        styles.container,
        style,
      ]}
      onPress={onPress}>
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
              backgroundColor: divider,
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
