import React, { useImperativeHandle, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

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

    const daysJumpToDate = (date: Date) => {
      wrappedDaysRef.current?.jumpToDate(date);
    };

    const monthsJumpToDate = (date: Date) => {
      wrappedMonthsRef.current?.jumpToDate(date);
    };

    const monthsScrollToDate = (date: Date) => {
      wrappedMonthsRef.current?.scrollToDate(date);
    };

    const jumpToDate = (date: Date) => {
      daysJumpToDate(date);
      monthsJumpToDate(date);
    };

    const onPressMonth = (date: Date) => {
      const targetDate =
        value !== undefined &&
        value.getFullYear() === date.getFullYear() &&
        value.getMonth() === date.getMonth()
          ? value
          : date;

      daysJumpToDate(targetDate);
    };

    useImperativeHandle(ref, () => ({
      jumpToDate,
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
          onMonthChange={monthsScrollToDate}
          startDate={startDate}
          onPress={onChange}
          formatDayLabel={formatDayLabel}
          formatDay={formatDay}
          value={value}
          width={width}
        />
      </View>
    );
  },
);

export default React.memo(CalendarStrip);
