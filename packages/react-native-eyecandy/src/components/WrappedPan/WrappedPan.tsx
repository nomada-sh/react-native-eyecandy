import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  AnimateProps,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import withDecay from './withDecay';

export interface WrappedPanProps extends AnimateProps<ViewProps> {
  value: SharedValue<number>;
  width: number;
  height: number;
  children: React.ReactNode;
  horizontal?: boolean;
  contentContainerStyle?: ViewProps['style'];
  /**
   * @worklet
   */
  onActive?: (value: number, velocity: number) => void;
  /**
   * @worklet
   */
  onDecay?: (value: number, velocity: number) => void;
  /**
   * @worklet
   */
  calculateExactEndValue?: (value: number, velocity: number) => number;
}

function wrap(x: number, min: number, max: number) {
  'worklet';
  let r = 0;

  if (x < min) r = max - ((min - x) % (max - min));
  else r = min + ((x - min) % (max - min));

  return r;
}

type Context = {
  start: number;
};

interface ContainerProps extends AnimateProps<ViewProps> {
  value: SharedValue<number>;
  index: number;
  count: number;
  width: number;
  height: number;
  children: React.ReactNode;
  horizontal?: boolean;
}

function Container({
  value,
  index,
  width,
  height,
  children,
  style,
  horizontal,
  count,
  ...props
}: ContainerProps) {
  const size = horizontal ? width : height;

  const animatedStyle = useAnimatedStyle(() => {
    const newValue = index * size + value.value;
    const wrappedValue = wrap(newValue, -size, size * (count - 1));

    return {
      width,
      height,
      transform: [
        {
          translateX: horizontal ? wrappedValue : 0,
        },
        {
          translateY: horizontal ? 0 : wrappedValue,
        },
      ],
    };
  });

  return (
    <Animated.View {...props} style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

export default function WrappedPan({
  value,
  width,
  height,
  horizontal,
  children,
  style,
  contentContainerStyle,
  onActive,
  onDecay,
  calculateExactEndValue,
  ...props
}: WrappedPanProps) {
  const childrenCount = React.Children.count(children);

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (e, ctx) => {
      ctx.start = value.value;
    },
    onActive: (e, ctx) => {
      const velocity = horizontal ? e.velocityX : e.velocityY;
      value.value = ctx.start + (horizontal ? e.translationX : e.translationY);

      if (onActive) onActive(value.value, velocity);
    },
    onEnd: e => {
      const v = horizontal ? e.velocityX : e.velocityY;

      if (Math.abs(v) > 200)
        value.value = withDecay({
          velocity: v,
          onActive: onDecay,
          onEnd: newValue => {
            value.value = withTiming(
              calculateExactEndValue
                ? calculateExactEndValue(newValue, v)
                : newValue,
            );
          },
        });
      else
        value.value = withTiming(
          calculateExactEndValue
            ? calculateExactEndValue(value.value, v)
            : value.value,
        );
    },
  });

  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return (
        <Container
          count={childrenCount}
          width={width}
          height={height}
          index={i}
          horizontal={horizontal}
          value={value}
          style={StyleSheet.absoluteFill}
        >
          {child}
        </Container>
      );
    }
    return null;
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style} {...props}>
        <View style={contentContainerStyle}>{wrappedChildren}</View>
      </Animated.View>
    </PanGestureHandler>
  );
}
