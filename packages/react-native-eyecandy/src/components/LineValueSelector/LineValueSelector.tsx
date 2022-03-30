import React from 'react';
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
import { Svg, Line } from 'react-native-svg';

export interface LineValueSelectorProps
  extends Omit<AnimateProps<ViewProps>, 'children'> {
  tickCount?: number;
  ticksWidth?: number;
  ticksHeight?: number;
  ticksStrokeWidth?: number;
  width: number;
  indicatorX?: number;
  onIncrease?: (increase: number) => void;
  onDecrease?: (descrease: number) => void;
  increment?: number;
  indicatorColor?: string;
  ticksColor?: string;
}

interface TicksProps {
  tickCount: number;
  width: number;
  height: number;
  strokeWidth: number;
  stroke: string;
}

type Context = {
  startX: number;
};

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function Ticks({
  tickCount: initialTickCount,
  width,
  strokeWidth,
  height,
  stroke,
}: TicksProps) {
  const tickCount = initialTickCount + 2;
  const tickGap = calculateTickGap(width, tickCount);
  const viewBox = `0 0 ${width} ${height}`;

  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < tickCount - 1; i++) {
    const x = tickGap * i;
    let yPadding = i === 0 ? 0 : 5;

    ticks.push(
      <Line
        key={i}
        x1={x}
        y1={yPadding}
        x2={x}
        y2={height - yPadding}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />,
    );
  }

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      {ticks}
    </Svg>
  );
}

function wrap(x: number, min: number, max: number) {
  'worklet';
  let r = 0;

  if (x < min) r = max - ((min - x) % (max - min));
  else r = min + ((x - min) % (max - min));

  return r;
}

function LineValueSelector({
  tickCount = 3,
  ticksWidth = 80,
  ticksHeight = 15,
  ticksStrokeWidth = 2,
  increment = 1,
  width,
  onDecrease,
  onIncrease,
  style,
  indicatorColor: indicatorColorProp,
  ticksColor: ticksColorProp,
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

  const indicatorX = useSharedValue(2 * tickGap - ticksStrokeWidth);
  const indicatorScale = useSharedValue(1);
  const x = useSharedValue(indicatorX.value);
  const prevX = useSharedValue(indicatorX.value);

  const startExactX = 2 * tickGap;
  const nextStartExactX = useSharedValue(startExactX);

  const calculateExactX = (x: number) => {
    'worklet';
    return Math.round(x / tickGap) * tickGap;
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (e, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (e, ctx) => {
      x.value = ctx.startX + e.translationX;
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

      if (exactX === prevExactX) return;

      const diff = exactX - prevExactX;
      const ticksMoved = (increment * -diff) / tickGap;

      if (ticksMoved > 0 && onIncrease) runOnJS(onIncrease)(ticksMoved);
      else if (ticksMoved < 0 && onDecrease) runOnJS(onDecrease)(-ticksMoved);

      prevX.value = x;
    },
    [increment, tickGap, onDecrease, onIncrease],
  );

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: indicatorColor,
      height: height * indicatorScale.value,
      width: 6,
      borderRadius: 3,
      transform: [{ translateX: indicatorX.value }],
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
