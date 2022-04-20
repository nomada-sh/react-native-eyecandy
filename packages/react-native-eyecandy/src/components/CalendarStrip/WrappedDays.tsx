import React, { useImperativeHandle, useRef, useState } from 'react';

import { compareAsc, differenceInDays } from 'date-fns';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

import Days from './Days';

export interface WrappedDaysProps {
  value?: Date;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  width: number;
  onPress?: (date: Date) => void;
  startDate: Date;
  onMonthChange?: (date: Date) => void;
}

export interface WrappedDaysHandle {
  jumpToDate: (date: Date) => void;
}

function daysDifference(endDate: Date, startDate: Date) {
  return (
    compareAsc(endDate, startDate) *
    Math.abs(differenceInDays(endDate, startDate))
  );
}

const WrappedDays = React.forwardRef<WrappedDaysHandle, WrappedDaysProps>(
  (
    {
      width,
      value,
      formatDay,
      formatDayLabel,
      onPress: onPressProp,
      startDate,
      onMonthChange,
    },
    ref,
  ) => {
    const [indexOffset, setIndexOffset] = React.useState(0);

    const dayWidth = 60;
    const dayHorizontalMargin = 6;

    const l = Math.round(width / dayWidth);
    const wrappedDayWidth = dayWidth + 2 * dayHorizontalMargin;
    const wrappedDaysWidth = l * wrappedDayWidth;

    const offsetX = -2 * wrappedDaysWidth;
    const x = useSharedValue(0);
    const [w, setW] = useState(0);
    const currentDateRef = useRef(startDate);

    // !!C needs to be an odd number.
    const C = 5;
    // const L = C * l;

    // const H = (w: number) => Math.floor(w / C);

    const calculateExactX = (x: number) => {
      'worklet';
      return Math.round(x / wrappedDayWidth) * wrappedDayWidth;
    };

    const calculateWraps = (x: number) => {
      'worklet';
      return Math.floor(-x / wrappedDaysWidth) + 0;
    };

    const onPress = (date: Date) => {
      if (onPressProp) onPressProp(date);
    };

    const onIndexChange = (index: number) => {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + index,
      );

      if (
        currentDateRef.current.getFullYear() !== date.getFullYear() ||
        currentDateRef.current.getMonth() !== date.getMonth()
      ) {
        currentDateRef.current = date;
        if (onMonthChange) onMonthChange(currentDateRef.current);
      }
    };

    const onMoving = (x: number) => {
      'worklet';
      const i = Math.floor(-x / wrappedDayWidth) + indexOffset + 0;
      runOnJS(onIndexChange)(i);

      const newW = calculateWraps(x);
      runOnJS(setW)(newW);
    };

    useImperativeHandle(ref, () => ({
      jumpToDate: (date: Date) => {
        const jumpToDayIndexOffset = -Math.floor(x.value / wrappedDayWidth) + 0;

        const newIndexOffset =
          daysDifference(date, startDate) - jumpToDayIndexOffset;

        setIndexOffset(newIndexOffset);
      },
    }));

    const days: React.ReactNode[] = [];

    const W = (w: number) => {
      'worklet';
      if (w > -3 && w < 3) return 0;

      if (w >= 3) return C * Math.floor((w + 2) / 5);

      return -C * Math.floor((-w + 2) / 5);
    };

    for (let f = 0; f < C; f++) {
      // const calculateIndex = (index: number) => {
      //   const li = f * l;
      //   const wi = wraps - f;
      //   const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
      //   const k = j + (index % l) - indexOffset;
      //   return k;
      // };

      const calculateIndex = (index: number) => {
        const fi = f - 2;
        const j = l * (W(w - fi) + fi);
        return j + index + indexOffset;
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
        onMoving={onMoving}
        offset={offsetX}
        calculateExactEndValue={calculateExactX}
        style={{
          height: 95,
          justifyContent: 'flex-end',
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
  },
);

export default WrappedDays;
