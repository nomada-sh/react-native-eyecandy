import React, { useImperativeHandle, useRef, useState } from 'react';
import { View } from 'react-native';

import { compareAsc, differenceInDays } from 'date-fns';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

import Days from './Days';

export interface WrappedDaysProps {
  value?: Date;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  width: number;
  onPress?: (date: Date) => void;
  startDate: Date;
}

export interface WrappedDaysHandle {
  jumpToDate: (date: Date) => void;
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
    },
    ref,
  ) => {
    const [visibleDate, setVisibleDate] = React.useState(startDate);
    const extraIndexOffsetRef = useRef(0);

    let indexOffset =
      compareAsc(startDate, visibleDate) *
      Math.abs(differenceInDays(startDate, visibleDate));
    if (indexOffset < 0) indexOffset -= 1;
    indexOffset += extraIndexOffsetRef.current;

    const dayWidth = 60;
    const dayHorizontalMargin = 6;

    const l = Math.round(width / dayWidth);
    const wrappedDayWidth = dayWidth + 2 * dayHorizontalMargin;
    const wrappedDaysWidth = l * wrappedDayWidth;

    const offsetX = -2 * wrappedDaysWidth;
    const x = useSharedValue(0);
    const [w, setW] = useState(0);

    // !!C needs to be an odd number.
    const C = 5;
    const L = C * l;

    const H = (w: number) => Math.floor(w / C);

    const calculateWraps = (x: number) => {
      'worklet';
      return Math.floor(-x / wrappedDaysWidth) + 0;
    };

    const onPress = (date: Date) => {
      if (onPressProp) onPressProp(date);
    };

    useAnimatedReaction(
      () => x.value,
      x => {
        const newWraps = calculateWraps(x);
        runOnJS(setW)(newWraps);
      },
    );

    const calculateExactX = (x: number) => {
      'worklet';
      return Math.round(x / wrappedDayWidth) * wrappedDayWidth;
    };

    useImperativeHandle(ref, () => ({
      jumpToDate: (date: Date) => {
        extraIndexOffsetRef.current = -Math.round(x.value / wrappedDayWidth);
        setVisibleDate(new Date(date));
      },
    }));

    const days: React.ReactNode[] = [];

    const W = (w: number) => {
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
        return j + index - indexOffset;
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
      <View>
        {/* {days} */}
        <WrappedPan
          // disableDecay
          offset={offsetX}
          calculateExactEndValue={calculateExactX}
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
      </View>
    );
  },
);

export default WrappedDays;
