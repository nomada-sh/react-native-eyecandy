import React, { useEffect } from 'react';

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
  withTiming,
} from 'react-native-reanimated';
import { Svg, Line } from 'react-native-svg';

export interface LineValueSelectorProps {
  tickCount?: number;
  ticksWidth?: number;
  ticksHeight?: number;
  strokeWidth?: number;
  width: number;
  indicatorX?: number;
  onTicksMoved?: (ticksMoved: number) => void;
}

interface TicksProps {
  tickCount: number;
  width: number;
  height: number;
  strokeWidth: number;
  stroke: string;
}

interface IndicatorProps {
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

function Indicator({ height, stroke, strokeWidth }: IndicatorProps) {
  const width = strokeWidth;
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <Svg width={width} height={height} viewBox={viewBox}>
      <Line
        x1={0}
        y1={0}
        x2={0}
        y2={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
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
  onTicksMoved,
}: LineValueSelectorProps) {
  const totalTicks = Math.ceil(width / ticksWidth);
  const fullTicksWidth = ticksWidth * totalTicks;
  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);

  const indicatorX = useSharedValue(2 * tickGap - strokeWidth);
  const x = useSharedValue(indicatorX.value);
  const startExactX = useSharedValue(2 * tickGap);
  const indicatorScale = useSharedValue(1);

  const calculateExactX = (x: number) => {
    'worklet';
    return Math.round(x / tickGap) * tickGap;
  };

  const calculateTicksMoved = (x: number) => {
    'worklet';
    const diff = calculateExactX(x) - startExactX.value;
    return -diff / tickGap;
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (e, ctx) => {
      ctx.startX = x.value;
      indicatorScale.value = withTiming(1.5, { duration: 100 });
    },
    onActive: (e, ctx) => {
      x.value = ctx.startX + e.translationX;
    },
    onEnd: e => {
      const vx = Math.abs(e.velocityX);

      if (vx > 200) {
        x.value = withDecay(
          {
            velocity: e.velocityX,
          },
          () => {
            x.value = withTiming(calculateExactX(x.value));
            indicatorScale.value = withTiming(1, { duration: 100 });
          },
        );
      } else {
        const exactX = calculateExactX(x.value);

        x.value = withSpring(exactX);
        indicatorScale.value = withTiming(1, { duration: 100 });
      }
    },
  });

  useAnimatedReaction(
    () => x.value,
    x => {
      if (onTicksMoved) runOnJS(onTicksMoved)(calculateTicksMoved(x));
    },
  );

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: indicatorX.value },
        {
          scaleY: indicatorScale.value,
        },
      ],
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
        stroke="green"
      />,
    );

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          width,
          height: ticksHeight * 3,
          // backgroundColor: 'red',
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
        <Animated.View style={indicatorStyle}>
          <Indicator height={ticksHeight * 2} strokeWidth={6} stroke="blue" />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default LineValueSelector;
