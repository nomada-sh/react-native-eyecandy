import React, { useImperativeHandle, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

import { Button } from '../Button';

import WrappedDays, { WrappedDaysHandle } from './WrappedDays';
import WrappedMonths, { WrappedMonthsHandle } from './WrappedMonths';

export interface CalendarStripProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  formatMonthLabel?: (date: Date) => string;
  value: Date;
  onChange: (date: Date) => void;
  startDate?: Date;
}

const today = new Date();
const defaultStartDate = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
);

export interface CalendarStripHandle {
  jumpToDate: (date: Date) => void;
  scrollToMonth: (date: Date, minMonthDiff?: number) => void;
}

const CalendarStrip = React.forwardRef<CalendarStripHandle, CalendarStripProps>(
  (
    {
      width: widthProp,
      formatDay,
      formatDayLabel,
      formatMonthLabel,
      value,
      onChange,
      startDate = defaultStartDate,
    },
    ref,
  ) => {
    const { colors } = useTheme();

    const { width: windowWidth } = useWindowDimensions();
    const width = widthProp !== undefined ? widthProp : windowWidth;

    const wrappedDaysRef = useRef<WrappedDaysHandle>(null);
    const wrappedMonthsRef = useRef<WrappedMonthsHandle>(null);

    const jumpToDay = (date: Date) => {
      wrappedDaysRef.current?.jumpToDate(date);
    };

    const jumpToMonth = (date: Date) => {
      wrappedMonthsRef.current?.jumpToDate(date);
    };

    const scrollToMonth = (date: Date, minMonthDiff: number = 2) => {
      wrappedMonthsRef.current?.scrollToDate(date, minMonthDiff);
    };

    const jumpToDate = (date: Date) => {
      jumpToDay(date);
      jumpToMonth(date);
    };

    const onPressMonth = (date: Date) => {
      const targetDate =
        value !== undefined &&
        value.getFullYear() === date.getFullYear() &&
        value.getMonth() === date.getMonth()
          ? value
          : date;

      jumpToDay(targetDate);
    };

    const jumpToToday = () => {
      jumpToDate(new Date());
    };

    const jumpToSelected = () => {
      jumpToDate(value);
    };

    useImperativeHandle(ref, () => ({
      jumpToDate,
      scrollToMonth,
    }));

    return (
      <View>
        <WrappedMonths
          ref={wrappedMonthsRef}
          startDate={startDate}
          formatMonthLabel={formatMonthLabel}
          value={value}
          onPress={onPressMonth}
        />
        <View
          style={{
            height: 1,
            width,
            backgroundColor: colors.input.default.border,
            marginVertical: 5,
          }}
        />
        <WrappedDays
          ref={wrappedDaysRef}
          onMonthChange={scrollToMonth}
          startDate={startDate}
          onPress={onChange}
          formatDayLabel={formatDayLabel}
          formatDay={formatDay}
          value={value}
          width={width}
        />
        <View
          style={{
            marginTop: 15,
            flexDirection: 'row',
          }}
        >
          <Button
            variant="rounded"
            style={{
              flex: 1,
              height: 40,
              marginHorizontal: 5,
            }}
            text="Today"
            fullwidth={false}
            onPress={jumpToToday}
          />
          <Button
            variant="rounded"
            style={{
              flex: 1,
              height: 40,
            }}
            text="Selected"
            fullwidth={false}
            onPress={jumpToSelected}
          />
        </View>
      </View>
    );
  },
);

export default React.memo(CalendarStrip);
