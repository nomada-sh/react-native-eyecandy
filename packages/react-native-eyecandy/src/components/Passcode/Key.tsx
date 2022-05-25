import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '../../typography';

export interface KeyProps {
  keyValue: string | null;
  isDeleteKey: boolean;
  isEmptyKey: boolean;
  hideDeleteKey: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  row: number;
  col: number;
  testID?: string;
  testIDPrefix?: string;
}

export function Key({
  keyValue,
  isDeleteKey,
  isEmptyKey,
  hideDeleteKey,
  onPressIn,
  onPressOut,
  testID,
  testIDPrefix,
}: KeyProps) {
  const { palette, colors } = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  const backgroundColor = colors.button.default.background;
  const textColor = isPressed ? 'white' : undefined;

  const pressedOverlayBackgroundColor = palette.primary[500];
  const pressedOverlayOpacity = useSharedValue(0);

  const pressedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: pressedOverlayOpacity.value,
      backgroundColor: pressedOverlayBackgroundColor,
    };
  });

  const visible = !(
    (isEmptyKey && keyValue === null) ||
    (isDeleteKey && hideDeleteKey)
  );

  return (
    <View
      testID={
        testIDPrefix ? `${testIDPrefix}-${keyValue}-container` : undefined
      }
      style={{
        flex: 1,
        alignItems: 'center',
        margin: 4,
      }}
    >
      {visible ? (
        <Pressable
          testID={testID}
          onPressIn={() => {
            setIsPressed(true);
            onPressIn();
            pressedOverlayOpacity.value = withTiming(1, {
              duration: 100,
            });
          }}
          onPressOut={() => {
            setIsPressed(false);
            onPressOut();
            pressedOverlayOpacity.value = withTiming(0, {
              duration: 500,
            });
          }}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={[StyleSheet.absoluteFill, pressedOverlayStyle]}
          />
          {isDeleteKey && keyValue === null ? (
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
        </Pressable>
      ) : null}
    </View>
  );
}
