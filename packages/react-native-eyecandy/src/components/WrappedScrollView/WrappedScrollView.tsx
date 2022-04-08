import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  AnimateProps,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withDecay,
} from 'react-native-reanimated';

export interface WrappedScrollViewProps extends AnimateProps<ViewProps> {
  value: SharedValue<number>;
  size: number;
  children: React.ReactNode;
  horizontal?: boolean;
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
  size: number;
  children: React.ReactNode;
  horizontal?: boolean;
}

function Container({
  value,
  index,
  size,
  children,
  style,
  horizontal,
  count,
  ...props
}: ContainerProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const newValue = index * size + value.value;
    const wrappedValue = wrap(newValue, -size, size * (count - 1));

    return {
      width: horizontal ? size : undefined,
      height: horizontal ? undefined : size,
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

export default function WrappedScrollView({
  value,
  size,
  horizontal,
  children,
  style,
  ...props
}: WrappedScrollViewProps) {
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
    },
    onEnd: e => {
      value.value = withDecay({
        velocity: horizontal ? e.velocityX : e.velocityY,
      });
    },
  });

  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (React.isValidElement(child)) {
      return (
        <Container
          count={childrenCount}
          size={size}
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
      <Animated.View
        style={[
          {
            flexDirection: horizontal ? 'row' : 'column',
            overflow: 'hidden',
          },
          style,
        ]}
        {...props}
      >
        {wrappedChildren}
      </Animated.View>
    </PanGestureHandler>
  );
}
