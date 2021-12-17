import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Day from '../Day';

export interface DaysProps {
  data?: Array<false | CalendarDate>;
  onDayPress?: (value: CalendarDate) => void;
  selectedDate?: CalendarDate;
  year: number;
  month: number;
  debug?: boolean;
}

function Days({
  debug,
  data = [],
  onDayPress,
  selectedDate,
  month,
  year,
}: DaysProps) {
  const count = useRef(1);
  debug &&
    console.log('DAYS', `${month}/${year},`, 'RENDER COUNT:', count.current++);

  const isDateSelected = useCallback(
    (value: CalendarDate) => {
      if (!selectedDate) return false;

      const selected =
        selectedDate.year === value.year &&
        selectedDate.month === value.month &&
        selectedDate.day === value.day;

      return selected;
    },
    [selectedDate],
  );

  return (
    <View style={styles.container}>
      {data.map((day, index) => {
        const selected = day ? isDateSelected(day) : false;
        return (
          <Day
            onPress={onDayPress}
            key={index}
            value={day}
            selected={selected}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40 * 6,
  },
});

export default React.memo(Days);

/*
export default React.memo(Days, (prev, next) => {
  let equal =
    prev.data === next.data &&
    prev.onDayPress === next.onDayPress &&
    prev.year === next.year &&
    prev.month === next.month;

  if (!equal) return false;

  // TODO: Refactor this.
  if (next.selectedDate) {
    if (
      prev.year === next.selectedDate.year &&
      prev.month === next.selectedDate.month
    )
      equal = false;

    if (prev.selectedDate) {
      if (
        prev.year === prev.selectedDate.year &&
        prev.month === prev.selectedDate.month
      )
        equal = false;
    }

    return equal;
  }

  return true;
});
*/