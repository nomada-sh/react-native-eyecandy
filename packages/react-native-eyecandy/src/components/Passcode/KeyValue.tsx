import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '../../typography';

export interface KeyValueProps {
  keyValue: string;
  isDeleteKey?: boolean;
  isPressed?: boolean;
}

export function KeyValue({ keyValue, isDeleteKey, isPressed }: KeyValueProps) {
  const { palette, colors } = useTheme();

  const pressedOverlayOpacity = useSharedValue(0);

  const pressedOverlayBackgroundColor = isPressed
    ? palette.primary[500]
    : colors.button.default.background;

  const backgroundColor = colors.button.default.background;

  const textColor = isPressed ? 'white' : undefined;

  useEffect(() => {
    pressedOverlayOpacity.value = withTiming(isPressed ? 1 : 0, {
      duration: 100,
    });
  }, [isPressed, pressedOverlayOpacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: pressedOverlayOpacity.value,
      backgroundColor: pressedOverlayBackgroundColor,
    };
  });

  return (
    <View
      style={{
        margin: 4,
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]} />
      {isDeleteKey ? (
        <Backspace
          color={textColor}
          style={{
            transform: [{ translateX: -1 }],
          }}
        />
      ) : (
        <Body size="large" weight="bold" color={textColor}>
          {keyValue}
        </Body>
      )}
    </View>
  );
}
