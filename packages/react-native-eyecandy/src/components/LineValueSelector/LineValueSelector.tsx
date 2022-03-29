import React from 'react';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import { Svg, Line } from 'react-native-svg';

export interface LineValueSelectorProps {
  tickCount?: number;
  ticksWidth?: number;
  ticksHeight?: number;
  strokeWidth?: number;
  width: number;
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
  startX2: number;
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
  strokeWidth = 2,
  width,
}: LineValueSelectorProps) {
  const totalTicks = Math.ceil(width / ticksWidth);
  const fullTicksWidth = ticksWidth * totalTicks;

  const x = useSharedValue(0);

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
      x.value = withDecay({
        velocity: e.velocityX,
      });
    },
  });

  const animatedStyleLeft = useAnimatedStyle(() => {
    const translateX = wrap(
      x.value + 2 * fullTicksWidth,
      -fullTicksWidth,
      fullTicksWidth,
    );

    return {
      transform: [{ translateX }],
    };
  });

  const animatedStyleRight = useAnimatedStyle(() => {
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
        strokeWidth={strokeWidth}
        tickCount={tickCount}
        width={ticksWidth}
        height={ticksHeight}
        stroke="black"
      />,
    );

  const ticksRight: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++)
    ticksRight.push(
      <Ticks
        key={`ticks-right-${i}`}
        strokeWidth={strokeWidth}
        tickCount={tickCount}
        width={ticksWidth}
        height={ticksHeight}
        stroke="black"
      />,
    );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          width,
          height: ticksHeight * 3,
          backgroundColor: 'red',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              position: 'absolute',
            },
            animatedStyleLeft,
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
            animatedStyleRight,
          ]}
        >
          {ticksRight}
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default LineValueSelector;
