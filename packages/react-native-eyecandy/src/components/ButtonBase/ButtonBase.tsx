import React, { ReactNode, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import type { ThemeButtonColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { usePressableStyles } from '../../hooks';

import useStyles from './useStyles';

export interface ButtonBaseProps extends PressableProps {
  children?: ReactNode;
  /**
   * Container view style.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Pressable style.
   */
  pressableStyle?: PressableProps['style'];
  inverse?: boolean;
  color?: ThemeButtonColorChoices;
  styles?: {
    /**
     * Container view style (Applied before style).
     */
    container?: StyleProp<ViewStyle>;
    /**
     * Pressable style (Applied before pressable style).
     */
    pressable?: PressableProps['style'];
  };
  variant?: 'default' | 'rounded' | 'squared';
  height?: number;
  fullwidth?: boolean;
  loading?: boolean;
  hideDisabledOverlay?: boolean;
  transparent?: boolean;
  outlined?: boolean;
  disableHapticFeedback?: boolean;
  marginTop?: number;
  marginBottom?: number;
}

export function ButtonBase({
  children,
  style,
  pressableStyle,
  inverse,
  color,
  variant,
  height,
  fullwidth,
  disabled: disabledProp,
  loading,
  styles: customStyles = {},
  hideDisabledOverlay,
  onPress: onPressProp,
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  transparent,
  outlined,
  disableHapticFeedback = false,
  marginBottom,
  marginTop,
  ...props
}: ButtonBaseProps) {
  const animated = useRef(new Animated.Value(0)).current;
  const disabled = disabledProp || loading;

  const styles = useStyles({
    color,
    inverse,
    variant,
    height,
    disabled,
    fullwidth,
    transparent,
    outlined,
  });

  const getButtonStyle = usePressableStyles([
    styles.pressable,
    customStyles.pressable,
    pressableStyle,
  ]);

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

  const onPress = (e: GestureResponderEvent) => {
    if (!disableHapticFeedback)
      ReactNativeHapticFeedback.trigger('impactMedium');
    onPressProp?.(e);
  };

  const onPressIn = (e: GestureResponderEvent) => {
    fadeIn();
    onPressInProp?.(e);
  };

  const onPressOut = (e: GestureResponderEvent) => {
    fadeOut();
    onPressOutProp?.(e);
  };

  const showActiveOpacity = Platform.OS === 'ios' || Platform.OS === 'web';

  return (
    <View
      style={[
        {
          marginTop,
          marginBottom,
        },
        styles.container,
        customStyles.container,
        style,
      ]}
    >
      {showActiveOpacity ? (
        <Animated.View style={[styles.activeOpacity, { opacity: animated }]} />
      ) : null}
      <Pressable
        style={getButtonStyle}
        android_ripple={{
          color: styles.ripple.color,
        }}
        disabled={disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...props}
      >
        {children}
      </Pressable>
      {disabled && !hideDisabledOverlay ? (
        <View style={styles.disabled} />
      ) : null}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={styles.loading.color} />
        </View>
      ) : null}
    </View>
  );
}
