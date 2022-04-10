import React, { useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

import WrappedScrollView from '../WrappedScrollView';

export interface CalendarStripProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  formatMonthLabel?: (date: Date) => string;
  value?: Date;
  onChange?: (date: Date) => void;
}

import Day from './Day';
import Months from './Months';

export default function CalendarStrip({
  width: widthProp,
  formatDay,
  formatDayLabel,
  formatMonthLabel,
  value,
  onChange,
}: CalendarStripProps) {
  const { colors } = useTheme();
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
  const monthsX = useSharedValue(0);
  const selectedWRef = useRef(0);

  const [w, setW] = useState(0);

  const H = (w: number) => Math.floor(w / C);

  useAnimatedReaction(
    () => -x.value,
    x => {
      runOnJS(setW)(Math.floor(x / lWidth));
    },
  );

  const days: React.ReactNode[] = [];
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

    days.push(
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
    <View>
      <WrappedScrollView
        style={{
          height: 45,
        }}
        value={monthsX}
        horizontal
        width={91 * 12}
        height={35}
      >
        <Months
          formatMonthLabel={formatMonthLabel}
          month={value !== undefined ? value.getMonth() : undefined}
          year={value !== undefined ? value.getFullYear() : undefined}
          onPress={(month: number) => {
            console.log('month', month);
          }}
        />
        <Months
          formatMonthLabel={formatMonthLabel}
          month={value !== undefined ? value.getMonth() : undefined}
          year={value !== undefined ? value.getFullYear() : undefined}
          onPress={(month: number) => {
            console.log('month', month);
          }}
        />
      </WrappedScrollView>
      <WrappedScrollView
        value={x}
        horizontal
        width={uWidth}
        height={100}
        containerStyle={{
          top: 10,
        }}
        style={{
          borderTopWidth: 1,
          borderColor: colors.input.default.border,
          height: 120,
        }}
      >
        {days}
      </WrappedScrollView>
    </View>
  );
}
