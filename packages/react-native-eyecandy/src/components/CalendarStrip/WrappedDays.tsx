import React, { useRef } from 'react';

import { compareAsc, differenceInDays } from 'date-fns';
import { runOnJS, SharedValue } from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

import Days from './Days';

export interface DaysProps {
  value?: Date;
  x: SharedValue<number>;
  wraps: number;
  onChangeWraps: (wraps: number) => void;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  width: number;
  onPress?: (date: Date) => void;
  startDate: Date;
  visibleDate: Date;
  extraIndexOffset?: number;
}

function WrappedDays({
  x,
  wraps,
  onChangeWraps,
  width,
  value,
  formatDay,
  formatDayLabel,
  onPress: onPressProp,
  startDate,
  visibleDate,
  extraIndexOffset = 0,
}: DaysProps) {
  const dayWidth = 60;
  const dayHorizontalMargin = 6;

  const l = Math.round(width / dayWidth);
  const wrappedDayWidth = dayWidth + 2 * dayHorizontalMargin;
  const wrappedDaysWidth = l * wrappedDayWidth;

  let indexOffset =
    compareAsc(startDate, visibleDate) *
    Math.abs(differenceInDays(startDate, visibleDate));
  if (indexOffset < 0) indexOffset -= 1;
  indexOffset += extraIndexOffset;

  // !!C needs to be an odd number.
  const C = 5;
  const L = C * l;

  const wRef = useRef(0);

  const H = (w: number) => Math.floor(w / C);

  const onPress = (date: Date) => {
    if (onPressProp) onPressProp(date);
    wRef.current = wraps;
  };

  const onActive = (x: number, _v: number) => {
    'worklet';
    runOnJS(onChangeWraps)(Math.floor(-x / wrappedDaysWidth));
  };

  const onDecay = (x: number, _v: number) => {
    'worklet';
    runOnJS(onChangeWraps)(Math.floor(-x / wrappedDaysWidth));
  };

  const days: React.ReactNode[] = [];

  for (let f = 0; f < C; f++) {
    const calculateIndex = (index: number) => {
      const li = f * l;
      const wi = wraps - f;
      const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
      const k = j + (index % l) - indexOffset;
      return k;
    };

    days.push(
      <Days
        startDate={startDate}
        daysToShow={l}
        dayWidth={dayWidth}
        dayHorizontalMargin={dayHorizontalMargin}
        key={f}
        calculateIndex={calculateIndex}
        onPress={onPress}
        formatDayLabel={formatDayLabel}
        formatDay={formatDay}
        value={value}
      />,
    );
  }

  return (
    <WrappedPan
      onActive={onActive}
      onDecay={onDecay}
      style={{
        height: 105,
        justifyContent: 'center',
      }}
      contentContainerStyle={{
        height: 85,
      }}
      value={x}
      horizontal
      width={wrappedDaysWidth}
      height={85}
    >
      {days}
    </WrappedPan>
  );
}

export default WrappedDays;
