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
import withWrapper from './withWrapper';
import wrap from './wrap';

export interface WrappedPanProps extends AnimateProps<ViewProps> {
  value: SharedValue<number>;
  width: number;
  height: number;
  children: React.ReactNode;
  horizontal?: boolean;
  contentContainerStyle?: ViewProps['style'];
  disableDecay?: boolean;
  onMoving?: (value: number) => void;
  calculateExactEndValue?: (value: number, velocity: number) => number;
  offset?: number;
}

export type Context = {
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
  offset?: number;
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
  offset = 0,
  ...props
}: ContainerProps) {
  const size = horizontal ? width : height;

  const animatedStyle = useAnimatedStyle(() => {
    const newValue = index * size + value.value;
    const wrappedValue = wrap(newValue + offset, -size, size * (count - 1));

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
  onMoving,
  calculateExactEndValue,
  disableDecay = false,
  offset,
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
      value.value = ctx.start + (horizontal ? e.translationX : e.translationY);
      onMoving && onMoving(value.value);
    },
    onEnd: e => {
      const v = horizontal ? e.velocityX : e.velocityY;

      const onEnd = (newValue: number) => {
        const endValue = calculateExactEndValue
          ? calculateExactEndValue(newValue, v)
          : newValue;

        value.value = withWrapper(withTiming(endValue), state => {
          'worklet';
          onMoving && onMoving(state.current);
        });
      };

      if (Math.abs(v) > 200 && !disableDecay)
        value.value = withDecay({
          velocity: v,
          onMoving,
          onEnd,
        });
      else {
        onEnd(value.value);
      }
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
          offset={offset}
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
