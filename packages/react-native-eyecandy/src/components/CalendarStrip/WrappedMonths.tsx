import React, { useImperativeHandle, useRef, useState } from 'react';

import { compareAsc, differenceInMonths } from 'date-fns';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

import Months from './Months';

export interface WrappedMonthsHandle {
  jumpToDate: (date: Date) => void;
}

export interface WrappedMonthsProps {
  value?: Date;
  formatMonthLabel?: (date: Date) => string;
  onPress?: (date: Date) => void;
  startDate: Date;
}

const WrappedMonths = React.forwardRef<WrappedMonthsHandle, WrappedMonthsProps>(
  (
    { value, formatMonthLabel, onPress: onPressProp, startDate: startDateProp },
    ref,
  ) => {
    const startDateRef = useRef(
      new Date(startDateProp.getFullYear(), startDateProp.getMonth(), 1),
    );
    if (
      startDateProp.getMonth() !== startDateRef.current.getMonth() ||
      startDateProp.getFullYear() !== startDateRef.current.getFullYear()
    )
      startDateRef.current = new Date(
        startDateProp.getFullYear(),
        startDateProp.getMonth(),
        1,
      );

    const startDate = startDateRef.current;
    const [visibleDate, setVisibleDate] = React.useState(startDate);
    const extraIndexOffsetRef = useRef(0);

    const indexOffset =
      compareAsc(startDate, visibleDate) *
        Math.abs(differenceInMonths(startDate, visibleDate)) +
      extraIndexOffsetRef.current;

    const x = useSharedValue(0);

    const monthWidth = 120;
    const monthHorizontalMargin = 6;

    const l = 12;
    const wrappedMonthWidth = monthWidth + 2 * monthHorizontalMargin;
    const wrappedMonthsWidth = l * wrappedMonthWidth;

    // !!C needs to be an odd number.
    const C = 3;
    const L = C * l;

    const wRef = useRef(0);
    const [w, setW] = useState(0);

    const H = (w: number) => Math.floor(w / C);

    const onPress = (date: Date) => {
      if (onPressProp) onPressProp(date);
      wRef.current = w;
    };

    const calculateWraps = (x: number) => {
      'worklet';
      return Math.floor(-x / wrappedMonthsWidth) + 0;
    };

    const calculateExactX = (x: number) => {
      'worklet';
      return Math.round(x / wrappedMonthWidth) * wrappedMonthWidth;
    };

    useAnimatedReaction(
      () => x.value,
      x => {
        const newWraps = calculateWraps(x);
        runOnJS(setW)(newWraps);
      },
    );

    useImperativeHandle(ref, () => ({
      jumpToDate: (date: Date) => {
        extraIndexOffsetRef.current = -Math.round(x.value / wrappedMonthWidth);
        setVisibleDate(new Date(date.getFullYear(), date.getMonth(), 1));
      },
    }));

    const months: React.ReactNode[] = [];

    for (let f = 0; f < C; f++) {
      const calculateIndex = (index: number) => {
        const li = f * l;
        const wi = w - f;
        const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
        const k = j + (index % l) - indexOffset;
        return k;
      };

      months.push(
        <Months
          startDate={startDate}
          calculateIndex={calculateIndex}
          monthHorizontalMargin={monthHorizontalMargin}
          monthWidth={monthWidth}
          key={f}
          formatMonthLabel={formatMonthLabel}
          value={value}
          onPress={onPress}
        />,
      );
    }

    return (
      <WrappedPan
        style={{
          height: 55,
          justifyContent: 'center',
        }}
        contentContainerStyle={{
          height: 35,
        }}
        value={x}
        horizontal
        width={wrappedMonthsWidth}
        height={50}
        calculateExactEndValue={calculateExactX}
      >
        {months}
      </WrappedPan>
    );
  },
);

export default WrappedMonths;
