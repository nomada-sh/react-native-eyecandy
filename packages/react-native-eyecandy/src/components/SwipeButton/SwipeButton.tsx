import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import Color from 'color';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Body } from '../../typography';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// TODO: Fix thumbIconComponent type.
export interface SwipeButtonProps {
  onFail?: () => void;
  onSuccess?: () => void;
  title?: string;
  height?: number;
  padding?: number;
  width: number;
}

type Context = {
  startX: number;
};

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet';
  return Math.min(Math.max(lowerBound, value), upperBound);
};

const feedbackTypes: ReactNativeHapticFeedback.HapticFeedbackTypes[] = [
  'impactMedium',
  'impactHeavy',
  'notificationSuccess',
];

function SwipeButton({
  title = '',
  onFail: onFailProp,
  onSuccess: onSuccessProp,
  padding = 5,
  height = 80,
  width,
}: SwipeButtonProps) {
  const feedbackRef = useRef<boolean[]>([...feedbackTypes.map(() => false)]);
  const minProgress = 1 / (feedbackTypes.length + 1);

  const swipableSize = height - padding * 2;
  const swipeRange = width - padding * 2;

  const maxX = swipeRange - swipableSize;
  const x = useSharedValue(0);
  const progress = useSharedValue(0);

  const { colors } = useTheme(t => ({
    colors: t.colors.button.primary,
  }));

  const fillColor = Color(colors.background).rgb().darken(0.3).string();

  const onSwipeFail = useCallback(() => {
    ReactNativeHapticFeedback.trigger('notificationError');
    feedbackRef.current = [...feedbackTypes.map(() => false)];

    onFailProp?.();
  }, [onFailProp]);

  const onSwipeSuccess = useCallback(() => {
    ReactNativeHapticFeedback.trigger('notificationSuccess');

    onSuccessProp?.();
  }, [onSuccessProp]);

  const onSwiping = useCallback(
    (currentProgress: number) => {
      let index = -1;

      for (let i = 0; i < feedbackTypes.length; i++) {
        const requiredProgress = minProgress + i * minProgress;
        if (currentProgress >= requiredProgress) index = i;
      }

      if (index === -1 || feedbackRef.current[index]) return;

      feedbackRef.current[index] = true;
      ReactNativeHapticFeedback.trigger(feedbackTypes[index]);
    },
    [minProgress],
  );

  const calculateProgress = (newX: number) => {
    'worklet';
    return (newX + swipableSize) / (maxX + swipableSize);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (e, ctx) => {
      x.value = clamp(ctx.startX + e.translationX, 0, maxX);
      progress.value = calculateProgress(x.value);

      onSwiping && runOnJS(onSwiping)(progress.value);
    },
    onEnd: _ => {
      if (x.value > swipeRange / 2 - swipableSize / 2) {
        x.value = withTiming(maxX, undefined, () => {
          runOnJS(onSwipeSuccess)();
        });
      } else {
        x.value = withTiming(0, undefined, () => {
          runOnJS(onSwipeFail)();
        });
      }
    },
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      right: swipeRange - swipableSize - x.value,
      opacity: interpolate(x.value, [0, maxX], [0, 1]),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: padding + x.value,
    };
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height,
        width,
        padding,
        borderRadius: height / 2,
        backgroundColor: colors.background,
      }}>
      <Body>{title}</Body>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: fillColor,
            borderRadius: height / 2,
          },
          fillStyle,
        ]}
      />
      {/* <View
        style={[
          StyleSheet.absoluteFill,
          {
            top: padding,
            bottom: padding,
            left: padding,
            right: padding,
            flexDirection: 'row',
          },
        ]}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'blue',
          }}
        />
      </View> */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: swipableSize,
              width: swipableSize,
              borderRadius: swipableSize / 2,
              backgroundColor: 'white',
            },
            animatedStyle,
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}

export default SwipeButton;
