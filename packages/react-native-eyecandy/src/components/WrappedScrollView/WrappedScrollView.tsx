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
  width: number;
  height: number;
  children: React.ReactNode;
  horizontal?: boolean;
  containerStyle?: AnimateProps<ViewProps>['style'];
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

export default function WrappedScrollView({
  value,
  width,
  height,
  horizontal,
  children,
  style,
  containerStyle,
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
      const v = horizontal ? e.velocityX : e.velocityY;
      const sign = Math.sign(v);
      const absV = Math.max(Math.abs(v), 1000);

      if (Math.abs(e.velocityX) > 200)
        value.value = withDecay({
          velocity: sign * absV,
          deceleration: 0.8,
        });
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
          style={[StyleSheet.absoluteFill, containerStyle]}
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
