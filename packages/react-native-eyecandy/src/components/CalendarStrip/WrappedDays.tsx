import React, { useEffect, useRef, useState } from 'react';

import id from 'date-fns/esm/locale/id/index.js';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

export interface DaysProps {
  value?: Date;
  x: SharedValue<number>;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  width: number;
  onPress?: (date: Date) => void;
  startDate: Date;
}

import Days from './Days';

function WrappedDays({
  x,
  width,
  value,
  formatDay,
  formatDayLabel,
  onPress: onPressProp,
  startDate,
}: DaysProps) {
  const dayWidth = 60;
  const dayHorizontalMargin = 6;

  const l = Math.round(width / dayWidth);
  const wrappedDaysWidth = l * (dayWidth + 2 * dayHorizontalMargin);

  // !!C needs to be an odd number.
  const C = 5;
  const L = C * l;

  const wRef = useRef(0);
  const [w, setW] = useState(0);
  const [hide, setHide] = useState(false);

  const H = (w: number) => Math.floor(w / C);

  const onPress = (date: Date) => {
    if (onPressProp) onPressProp(date);
    wRef.current = w;
  };

  const prevX = useSharedValue(x.value);

  useAnimatedReaction(
    () => x.value,
    x => {
      const diff = Math.abs(x - prevX.value);

      if (diff <= 100) {
        runOnJS(setW)(Math.floor(-x / wrappedDaysWidth));
      } else {
        runOnJS(setHide)(true);
      }

      prevX.value = x;
    },
  );

  const days: React.ReactNode[] = [];

  for (let f = 0; f < C; f++) {
    const calculateIndex = (index: number) => {
      const li = f * l;
      const wi = w - f;
      const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
      const k = j + (index % l);
      return k;
    };

    const showSelected =
      !hide &&
      (wRef.current === w || wRef.current === w - 1 || wRef.current === w + 1);

    days.push(
      <Days
        hide={hide}
        startDate={startDate}
        showSelected={showSelected}
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

  useEffect(() => {
    setHide(false);
  }, [w]);

  return (
    <WrappedPan
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
