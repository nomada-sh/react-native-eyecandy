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
  runOnJS,
  AnimateProps,
  withTiming,
} from 'react-native-reanimated';

import { Body } from '../../typography';

import Ticks from './Ticks';

function wrap(x: number, min: number, max: number) {
  'worklet';
  let r = 0;

  if (x < min) r = max - ((min - x) % (max - min));
  else r = min + ((x - min) % (max - min));

  return r;
}

type Context = {
  startX: number;
  x: number;
};

export interface AnimatedSelectorProps
  extends Omit<AnimateProps<ViewProps>, 'children'> {
  tickCount?: number;
  ticksWidth?: number;
  ticksHeight?: number;
  ticksStrokeWidth?: number;
  width: number;
  indicatorColor?: string;
  ticksColor?: string;
  onTranslate: (x: number) => void;
  x: number;
  minX?: number;
  maxX?: number;
  indicatorTickPosition?: number;
}

function calculateTickGap(width: number, tickCount: number) {
  return width / (tickCount - 1);
}

function AnimatedSelector({
  tickCount = 3,
  ticksWidth = 80,
  ticksHeight = 15,
  ticksStrokeWidth = 2,
  width,
  onTranslate,
  x,
  style,
  indicatorColor: indicatorColorProp,
  ticksColor: ticksColorProp,
  minX: minXProp,
  maxX: maxXProp,
  indicatorTickPosition = 2,
  ...props
}: AnimatedSelectorProps) {
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

  const minX = minXProp !== undefined ? -minXProp : undefined;
  const maxX = maxXProp !== undefined ? -maxXProp : undefined;

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
      ctx.startX = -x;
      ctx.x = ctx.startX;
    },
    onActive: (e, ctx) => {
      const newX = clampX(ctx.startX + e.translationX);
      ctx.x = newX;
      runOnJS(onTranslate)(-calculateExactX(newX));
    },
    onEnd: (e, ctx) => {
      indicatorScale.value = withTiming(0.6, { duration: 100 });

      if (Math.abs(e.velocityX) > 200) {
        const newX = clampX(ctx.x + e.velocityX);
        // runOnJS(onTranslate)(-calculateExactX(newX));
      }
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
    const translateX = wrap(-x + offsetX, -fullTicksWidth, fullTicksWidth);

    return {
      transform: [{ translateX }],
      flexDirection: 'row',
      position: 'absolute',
    };
  });

  const rightStyle = useAnimatedStyle(() => {
    const translateX = wrap(
      fullTicksWidth - x + offsetX,
      -fullTicksWidth,
      fullTicksWidth,
    );

    return {
      transform: [{ translateX }],
      flexDirection: 'row',
      position: 'absolute',
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

  const numbersLeft: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++)
    numbersLeft.push(
      <Body
        customColor={ticksColor}
        style={{
          position: 'absolute',
          left: i * ticksWidth - 2,
        }}
      >
        {i}
      </Body>,
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
        // stroke={ticksColor}
        stroke="red"
      />,
    );

  const numbersRight: React.ReactNode[] = [];

  for (let i = 0; i < totalTicks; i++)
    numbersRight.push(
      <Body
        // customColor={ticksColor}
        customColor="red"
        style={{
          position: 'absolute',
          left: i * ticksWidth - 2,
        }}
      >
        {i + totalTicks}
      </Body>,
    );

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

export default AnimatedSelector;
