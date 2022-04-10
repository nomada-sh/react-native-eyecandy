import React from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { useSharedValue } from 'react-native-reanimated';

export interface CalendarStripProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  formatMonthLabel?: (date: Date) => string;
  value?: Date;
  onChange?: (date: Date) => void;
}

import WrappedDays from './WrappedDays';
import WrappedMonths from './WrappedMonths';

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

  const daysX = useSharedValue(0);
  const monthsX = useSharedValue(0);

  return (
    <View>
      <WrappedMonths
        x={monthsX}
        formatMonthLabel={formatMonthLabel}
        value={value}
        onPress={date => {
          console.log(date.toLocaleString());
        }}
      />
      <WrappedDays
        onPress={onChange}
        formatDayLabel={formatDayLabel}
        formatDay={formatDay}
        value={value}
        width={width}
        x={daysX}
      />
    </View>
  );
}
