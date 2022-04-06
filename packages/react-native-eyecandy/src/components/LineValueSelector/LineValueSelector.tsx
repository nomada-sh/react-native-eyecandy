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
  AnimateProps,
  withTiming,
  SharedValue,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';

import { Body } from '../../typography';

import Ticks from './Ticks';
import withTickDecay from './withTickDecay';

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
  indicatorColor?: string;
  ticksColor?: string;
  tick: SharedValue<number>;
  minTick?: number;
  maxTick?: number;
  onActive: (tick: number, velocity: number) => void;
  onDecay: (tick: number, velocity: number) => void;
  onEnd?: (tick: number) => void;
  indicatorTickPosition?: number;
  increment?: number;
}

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function LineValueSelector({
  tickCount = 3,
  ticksWidth = 80,
  ticksHeight = 15,
  ticksStrokeWidth = 2,
  width,
  tick,
  minTick,
  maxTick,
  style,
  indicatorColor: indicatorColorProp,
  ticksColor: ticksColorProp,
  indicatorTickPosition = 2,
  onActive,
  onDecay,
  onEnd,
  increment = 1,
  ...props
}: LineValueSelectorProps) {
  const { colors, palette } = useTheme();
  const indicatorColor =
    indicatorColorProp !== undefined
      ? indicatorColorProp
      : palette.primary[500];
  const ticksColor =
    ticksColorProp !== undefined ? ticksColorProp : colors.text.default.normal;

  const numbersHeight = 20;
  const ticksFullHeight = ticksHeight * 3;
  const height = ticksFullHeight + numbersHeight;

  const tickGap = calculateTickGap(ticksWidth, tickCount + 2);
  const totalTicks = Math.ceil(width / ticksWidth);
  const fullTicksWidth = ticksWidth * totalTicks;

  const indicatorScale = useSharedValue(0.6);

  const x = useDerivedValue(() => -tick.value * tickGap, [tickGap]);
  const minX = minTick !== undefined ? -minTick * tickGap : undefined;
  const maxX = maxTick !== undefined ? -maxTick * tickGap : undefined;

  const clampX = (x: number) => {
    'worklet';
    if (minX !== undefined && maxX !== undefined)
      return Math.min(Math.max(x, maxX), minX);
    else if (maxX !== undefined) return Math.max(x, maxX);
    else if (minX !== undefined) return Math.min(x, minX);

    return x;
  };

  const calculateExactX = (x: number) => {
    'worklet';
    return Math.round(x / tickGap) * tickGap;
  };

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (e, ctx) => {
      indicatorScale.value = withTiming(1, { duration: 100 });
      ctx.startX = -tick.value * tickGap;
    },
    onActive: (e, ctx) => {
      const exactX = calculateExactX(clampX(ctx.startX + e.translationX));
      tick.value = -exactX / tickGap;
      if (onActive) runOnJS(onActive)(tick.value, -e.velocityX / tickGap);
    },
    onEnd: e => {
      indicatorScale.value = withTiming(0.6, { duration: 100 });

      if (Math.abs(e.velocityX) > 200)
        tick.value = withTickDecay({
          velocity: -e.velocityX,
          calculateExact: calculateExactX,
          tickGap,
          clamp: [minTick, maxTick],
          onDecay,
          onEnd,
        });
    },
  });

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: indicatorColor,
      height: ticksFullHeight * indicatorScale.value,
      width: 6,
      borderRadius: 3,
      transform: [
        { translateX: indicatorTickPosition * tickGap - ticksStrokeWidth },
      ],
    };
  });

  const offsetX = 2 * fullTicksWidth + indicatorTickPosition * tickGap;

  const leftStyle = useAnimatedStyle(() => {
    const translateX = wrap(x.value + offsetX, -fullTicksWidth, fullTicksWidth);

    return {
      transform: [{ translateX }],
      flexDirection: 'row',
      position: 'absolute',
    };
  });

  const rightStyle = useAnimatedStyle(() => {
    const translateX = wrap(
      fullTicksWidth + x.value + offsetX,
      -fullTicksWidth,
      fullTicksWidth,
    );

    return {
      transform: [{ translateX }],
      flexDirection: 'row',
      position: 'absolute',
    };
  });

  const value = tick.value * increment;

  const numbersIncrement = increment * (1 + tickCount);

  const leftMaxNumber = totalTicks * numbersIncrement;
  const rightMaxNumber = 2 * leftMaxNumber;

  const rightFactor = Math.floor(value / rightMaxNumber);
  // ! I don't know how I got to this, but it works
  // TODO: Understand this
  const leftFactor = 2 * (Math.floor(value / leftMaxNumber) - rightFactor);

  const startLeftNumber = leftFactor * leftMaxNumber;
  const startRightNumber = rightFactor * rightMaxNumber;

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

  const numbersLeft: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++) {
    const v = startLeftNumber + i * numbersIncrement;

    numbersLeft.push(
      <Body
        key={`numbers-left-${i}`}
        weight="bold"
        customColor={ticksColor}
        style={{
          position: 'absolute',
          width: 50,
          left: i * ticksWidth - 24,
          textAlign: 'center',
        }}
      >
        {v}
      </Body>,
    );
  }

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

  const numbersRight: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++) {
    const v = startRightNumber + (i + totalTicks) * numbersIncrement;

    numbersRight.push(
      <Body
        weight="bold"
        key={`numbers-right-${i}`}
        customColor={ticksColor}
        style={{
          position: 'absolute',
          width: 50,
          left: i * ticksWidth - 24,
          textAlign: 'center',
        }}
      >
        {v}
      </Body>,
    );
  }

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[
          {
            width,
            height,
          },
          style,
        ]}
        {...props}
      >
        <Animated.View
          style={{
            justifyContent: 'center',
            overflow: 'hidden',
            height: ticksFullHeight,
          }}
        >
          <Animated.View style={leftStyle}>{ticksLeft}</Animated.View>
          <Animated.View style={rightStyle}>{ticksRight}</Animated.View>
          <Animated.View style={indicatorStyle} />
        </Animated.View>
        <Animated.View
          style={{
            height: numbersHeight,
          }}
        >
          <Animated.View style={leftStyle}>{numbersLeft}</Animated.View>
          <Animated.View style={rightStyle}>{numbersRight}</Animated.View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default LineValueSelector;
