import React from 'react';
import { View } from 'react-native';

export interface DaysProps {
  value?: Date;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  daysToShow: number;
  dayWidth: number;
  dayHorizontalMargin: number;
  calculateIndex: (index: number) => number;
  onPress: (date: Date) => void;
  startDate: Date;
}

import Day from './Day';

function Days({
  value,
  formatDay,
  formatDayLabel,
  daysToShow,
  dayWidth,
  dayHorizontalMargin,
  calculateIndex,
  onPress,
  startDate,
}: DaysProps) {
  const children: React.ReactNode[] = [];

  for (let i = 0; i < daysToShow; i++) {
    const k = calculateIndex(i);

    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + k,
    );

    const selected =
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
