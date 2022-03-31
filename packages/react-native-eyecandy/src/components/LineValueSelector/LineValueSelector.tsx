import React, { useCallback, useEffect } from 'react';
import { ViewProps } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  useAnimatedReaction,
  runOnJS,
  AnimateProps,
} from 'react-native-reanimated';

import Ticks from './Ticks';

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function wrap(x: number, min: number, max: number) {
  'worklet';
  let r = 0;

  if (x < min) r = max - ((min - x) % (max - min));
  else r = min + ((x - min) % (max - min));

  return r;
}

type Context = {
  startX: number;
};

export interface LineValueSelectorProps
  extends Omit<AnimateProps<ViewProps>, 'children'> {
  tickCount?: number;
  ticksWidth?: number;
  ticksHeight?: number;
  ticksStrokeWidth?: number;
  width: number;
  indicatorX?: number;
  onChange?: (ticks: number) => void;
  increment?: number;
  indicatorColor?: string;
  ticksColor?: string;
  max?: number;
  min?: number;
}

function LineValueSelector({
  tickCount = 3,
  ticksWidth = 80,
  ticksHeight = 15,
  ticksStrokeWidth = 2,
  increment = 1,
  width,
  onChange,
  style,
  indicatorColor: indicatorColorProp,
  ticksColor: ticksColorProp,
  max,
  min,
  ...props
}: LineValueSelectorProps) {
  const { colors, palette } = useTheme();
  const indicatorColor =
    indicatorColorProp !== undefined
      ? indicatorColorProp
      : palette.primary[500];
  const ticksColor =
    ticksColorProp !== undefined ? ticksColorProp : colors.text.default.normal;

  const height = 3 * ticksHeight;

  const totalTicks = Math.ceil(width / ticksWidth);
  const fullTicksWidth = ticksWidth * totalTicks;
  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);

  const indicatorX = 2 * tickGap;
  const indicatorScale = useSharedValue(1);
  const x = useSharedValue(indicatorX);
  const prevX = useSharedValue(indicatorX);

  const startExactX = 2 * tickGap;
  const nextStartExactX = useSharedValue(startExactX);

  const calculateMaxExactX = useCallback(() => {
    return max !== undefined
      ? indicatorX - (max / increment) * tickGap
      : Number.POSITIVE_INFINITY;
  }, [increment, indicatorX, max, tickGap]);

  const calculateMinExactX = useCallback(() => {
    return min !== undefined
      ? indicatorX - (min / increment) * tickGap
      : Number.NEGATIVE_INFINITY;
  }, [min, indicatorX, increment, tickGap]);

  const maxExactX = useSharedValue(calculateMaxExactX());
  const minExactX = useSharedValue(calculateMinExactX());

  useEffect(() => {
    maxExactX.value = calculateMaxExactX();
    minExactX.value = calculateMinExactX();
  }, [calculateMaxExactX, calculateMinExactX, maxExactX, minExactX]);

  const calculateExactX = (x: number) => {
    'worklet';
    return Math.round(x / tickGap) * tickGap;
  };

  const clampX = (x: number) => {
    'worklet';
    return Math.min(Math.max(x, maxExactX.value), minExactX.value);
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (e, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (e, ctx) => {
      x.value = clampX(ctx.startX + e.translationX);
    },
    onEnd: e => {
      const vx = Math.abs(e.velocityX);

      const onFinish = () => {
        const exactX = calculateExactX(x.value);
        x.value = withSpring(exactX);
        nextStartExactX.value = exactX;
      };

      if (vx > 200) {
        x.value = withDecay(
          {
            velocity: e.velocityX,
            clamp: [maxExactX.value, minExactX.value],
          },
          onFinish,
        );
      } else {
        onFinish();
      }
    },
  });

  useAnimatedReaction(
    () => x.value,
    x => {
      const exactX = calculateExactX(x);
      const prevExactX = calculateExactX(prevX.value);
      if (exactX !== prevExactX) {
        const diff = exactX - prevExactX;
        const ticksMoved = (increment * -diff) / tickGap;

        if (onChange) runOnJS(onChange)(ticksMoved);

        prevX.value = x;
      }
    },
    [increment, tickGap, onChange],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: indicatorColor,
      height: height * indicatorScale.value,
      width: 6,
      borderRadius: 3,
      transform: [{ translateX: indicatorX - ticksStrokeWidth }],
    };
  });

  const ticksLeftStyle = useAnimatedStyle(() => {
    const translateX = wrap(
      x.value + 2 * fullTicksWidth,
      -fullTicksWidth,
      fullTicksWidth,
    );

    return {
      transform: [{ translateX }],
    };
  });

  const ticksRightStyle = useAnimatedStyle(() => {
    const translateX = wrap(
      fullTicksWidth + x.value + 2 * fullTicksWidth,
      -fullTicksWidth,
      fullTicksWidth,
    );

    return {
      transform: [{ translateX }],
    };
  });

  const ticksLeft: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++)
    ticksLeft.push(
      <Ticks
        key={`ticks-left-${i}`}
        strokeWidth={ticksStrokeWidth}
        tickCount={tickCount}
        width={ticksWidth}
        height={ticksHeight}
        stroke={ticksColor}
      />,
    );

  const ticksRight: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++)
    ticksRight.push(
      <Ticks
        key={`ticks-right-${i}`}
        strokeWidth={ticksStrokeWidth}
        tickCount={tickCount}
        width={ticksWidth}
        height={ticksHeight}
        stroke={ticksColor}
      />,
    );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            width,
            height,
            justifyContent: 'center',
            overflow: 'hidden',
          },
          style,
        ]}
        {...props}
      >
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              position: 'absolute',
            },
            ticksLeftStyle,
          ]}
        >
          {ticksLeft}
        </Animated.View>
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              position: 'absolute',
            },
            ticksRightStyle,
          ]}
        >
          {ticksRight}
        </Animated.View>
        <Animated.View style={indicatorStyle} />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default LineValueSelector;
