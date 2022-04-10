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

import Days from './Days';
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

  const width = widthProp !== undefined ? widthProp : windowWidth;

  const dayWidth = 70;
  const dayHorizontalMargin = 6;

  const l = Math.round(width / dayWidth);
  const daysWidth = l * dayWidth;

  const wrappedDaysWidth = daysWidth + dayHorizontalMargin * l;

  // !C needs to be an odd number.
  const daysC = 5;
  const daysL = daysC * l;

  const daysX = useSharedValue(0);
  const monthsX = useSharedValue(0);

  const selectedDaysWRef = useRef(0);
  const [daysW, setDaysW] = useState(0);

  const daysH = (w: number) => Math.floor(w / daysC);

  const onPressDay = (date: Date) => {
    if (onChange) onChange(date);
    selectedDaysWRef.current = daysW;
  };

  useAnimatedReaction(
    () => -daysX.value,
    x => {
      runOnJS(setDaysW)(Math.floor(x / daysWidth));
    },
  );

  const days: React.ReactNode[] = [];

  for (let f = 0; f < daysC; f++) {
    const calculateIndex = (index: number) => {
      const li = f * l;
      const wi = daysW - f;
      const j = li + daysL * Math.floor((wi - daysH(wi)) / (daysC - 1));
      const k = j + (index % l);
      return k;
    };

    const showSelected =
      selectedDaysWRef.current === daysW ||
      selectedDaysWRef.current === daysW - 1 ||
      selectedDaysWRef.current === daysW + 1;

    days.push(
      <Days
        showSelected={showSelected}
        daysToShow={l}
        dayWidth={dayWidth}
        dayHorizontalMargin={dayHorizontalMargin}
        key={f}
        calculateIndex={calculateIndex}
        onPress={onPressDay}
        formatDayLabel={formatDayLabel}
        formatDay={formatDay}
        value={value}
      />,
    );
  }

  const months: React.ReactNode[] = [];

  for (let i = 0; i < 3; i++) {
    months.push(
      <Months
        key={i}
        formatMonthLabel={formatMonthLabel}
        value={value}
        onPress={date => {
          console.log(date.toLocaleString());
        }}
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
        {months}
      </WrappedScrollView>
      <WrappedScrollView
        value={daysX}
        horizontal
        width={wrappedDaysWidth}
        height={85}
        containerStyle={{
          top: 15,
        }}
        style={{
          borderTopWidth: 1,
          borderColor: colors.input.default.border,
          height: 100,
        }}
      >
        {days}
      </WrappedScrollView>
    </View>
  );
}
