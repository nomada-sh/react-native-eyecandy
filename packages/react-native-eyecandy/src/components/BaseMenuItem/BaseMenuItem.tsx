import React, { useCallback } from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { useRippleColor } from '../../hooks';
import IconButton, { IconButtonProps } from '../IconButton';

export interface BaseMenuItemProps {
  style?: StyleProp<ViewStyle>;
  icon?: IconButtonProps['icon'];
  iconColor?: string;
  iconBackgroundColor?: string;
  separator?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  testID?: string;
}

function BaseMenuItem({
  style,
  icon,
  iconColor,
  iconBackgroundColor,
  separator = false,
  onPress: onPressProp,
  children,
  testID,
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
      onPress={onPress}
      testID={testID}
    >
      <View style={styles.content}>
        {icon && (
          <IconButton
            variant="rounded"
            transparent
            style={styles.icon}
            pressableStyle={{
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
