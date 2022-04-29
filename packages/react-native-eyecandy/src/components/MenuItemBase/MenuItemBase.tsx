import React, { useRef } from 'react';
import {
  Animated,
  Platform,
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

export interface MenuItemBaseProps {
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  icon?: IconButtonProps['icon'];
  iconColor?: string;
  iconBackgroundColor?: string;
  separator?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  testID?: string;
}

function MenuItemBase({
  style,
  contentContainerStyle,
  icon,
  iconColor,
  iconBackgroundColor,
  separator = false,
  onPress: onPressProp,
  children,
  testID,
}: MenuItemBaseProps) {
  const animated = useRef(new Animated.Value(0)).current;
  const { background, divider } = useColors(c => ({
    background: c.background.default,
    divider: c.divider.default,
  }));

  const rippleColor = useRippleColor(background.container).string();

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onPress = () => {
    ReactNativeHapticFeedback.trigger('impactMedium');
    onPressProp?.();
  };

  const showActiveOpacity = Platform.OS === 'ios' || Platform.OS === 'web';

  return (
    <Pressable
      android_ripple={{
        color: rippleColor,
      }}
      style={[
        {
          backgroundColor: background.container,
        },
        styles.container,
        style,
      ]}
      onPress={onPress}
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      testID={testID}
    >
      {showActiveOpacity ? (
        <Animated.View
          style={[
            styles.activeOpacity,
            { opacity: animated, backgroundColor: rippleColor },
          ]}
        />
      ) : null}
      <View style={[styles.contentContainer, contentContainerStyle]}>
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
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeOpacity: {
    ...StyleSheet.absoluteFillObject,
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

export default MenuItemBase;
