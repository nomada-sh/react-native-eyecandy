import React, { useRef, useState } from 'react';

import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';

import WrappedPan from '../WrappedPan';

export interface WrappedMonthsProps {
  value?: Date;
  x: SharedValue<number>;
  formatMonthLabel?: (date: Date) => string;
  onPress?: (date: Date) => void;
}

import Months from './Months';

function WrappedMonths({
  x,
  value,
  formatMonthLabel,
  onPress: onPressProp,
}: WrappedMonthsProps) {
  const monthWidth = 85;
  const monthHorizontalMargin = 6;

  const l = 12;
  const wrappedMonthsWidth = l * (monthWidth + 2 * monthHorizontalMargin);

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

  useAnimatedReaction(
    () => -x.value,
    x => {
      runOnJS(setW)(Math.floor(x / wrappedMonthsWidth));
    },
  );

  const months: React.ReactNode[] = [];

  for (let f = 0; f < C; f++) {
    const calculateIndex = (index: number) => {
      const li = f * l;
      const wi = w - f;
      const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
      const k = j + (index % l);
      return k;
    };

    months.push(
      <Months
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
      height={35}
    >
      {months}
    </WrappedPan>
  );
}

export default WrappedMonths;
