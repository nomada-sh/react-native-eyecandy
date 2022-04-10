import React from 'react';
import { View } from 'react-native';

export interface DaysProps {
  value?: Date;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  daysToShow: number;
  dayWidth: number;
  dayHorizontalMargin: number;
  showSelected?: boolean;
  calculateIndex: (index: number) => number;
  onPress: (date: Date) => void;
}

import Day from './Day';

function Days({
  value,
  formatDay,
  formatDayLabel,
  daysToShow,
  dayWidth,
  dayHorizontalMargin,
  showSelected = true,
  calculateIndex,
  onPress,
}: DaysProps) {
  const today = new Date();

  const children: React.ReactNode[] = [];

  for (let i = 0; i < daysToShow; i++) {
    const k = calculateIndex(i);

    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + k,
    );

    const selected =
      showSelected &&
      value !== undefined &&
      value.getFullYear() === date.getFullYear() &&
      value.getMonth() === date.getMonth() &&
      value.getDate() === date.getDate();

    children.push(
      <Day
        style={{
          width: dayWidth,
          marginHorizontal: dayHorizontalMargin,
          height: 85,
        }}
        key={i}
        date={date}
        selected={selected}
        onPress={onPress}
        formatDayLabel={formatDayLabel}
        formatDay={formatDay}
      />,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
      {children}
    </View>
  );
}

export default Days;
