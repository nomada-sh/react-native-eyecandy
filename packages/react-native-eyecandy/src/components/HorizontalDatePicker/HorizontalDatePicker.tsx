import React, { useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import enUS, { format } from 'date-fns';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import WrappedScrollView from '../WrappedScrollView';

export interface HorizontalDatePickerProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  value?: Date;
  onChange?: (date: Date) => void;
}

import Day from './Day';

const defaultFormatDayLabel = (date: Date) => {
  return format(date, 'EEEEEE', {
    locale: enUS,
  });
};

const defaultFormatDay = (date: Date) => {
  return format(date, 'dd', {
    locale: enUS,
  });
};

export default function HorizontalDatePicker({
  width: widthProp,
  formatDay = defaultFormatDay,
  formatDayLabel = defaultFormatDayLabel,
  value,
  onChange,
}: HorizontalDatePickerProps) {
  const { width: windowWidth } = useWindowDimensions();

  const onPress = (date: Date) => {
    if (onChange) onChange(date);
  };

  const width = widthProp !== undefined ? widthProp : windowWidth;

  const uWidth = 70;

  const l = Math.round(width / uWidth);
  const lWidth = l * uWidth;

  // C needs to be an odd number.
  const C = 5;
  const L = C * l;

  const initialIndex = 0;

  const initialX = -initialIndex * uWidth;
  const x = useSharedValue(initialX);
  const selectedWRef = useRef(0);

  const [w, setW] = useState(0);

  const H = (w: number) => Math.floor(w / C);

  useAnimatedReaction(
    () => -x.value,
    x => {
      runOnJS(setW)(Math.floor(x / lWidth));
    },
  );

  const children: React.ReactNode[] = [];
  const today = new Date();

  for (let i = 0; i < L; i++) {
    const f = Math.floor(i / l);
    const li = f * l;
    const wi = w - f;
    const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
    const k = j + (i % l) - initialIndex;

    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + k,
    );

    const selected =
      (selectedWRef.current === w ||
        selectedWRef.current === w - 1 ||
        selectedWRef.current === w + 1) &&
      value !== undefined &&
      value.getFullYear() === date.getFullYear() &&
      value.getMonth() === date.getMonth() &&
      value.getDate() === date.getDate();

    children.push(
      <Day
        key={i}
        date={date}
        selected={selected}
        onPress={date => {
          onPress(date);
          selectedWRef.current = w;
        }}
        formatDayLabel={formatDayLabel}
        formatDay={formatDay}
      />,
    );
  }

  return (
    <WrappedScrollView
      value={x}
      horizontal
      size={uWidth}
      style={{
        height: 100,
      }}
    >
      {children}
    </WrappedScrollView>
  );
}
