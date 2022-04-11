import React, { useImperativeHandle, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { useSharedValue } from 'react-native-reanimated';

import WrappedDays, { WrappedDaysHandle } from './WrappedDays';
import WrappedMonths from './WrappedMonths';

export interface CalendarStripProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  formatMonthLabel?: (date: Date) => string;
  value: Date;
  onChange: (date: Date) => void;
  startDate?: Date;
}

const defaultStartDate = new Date();

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

    const daysX = useSharedValue(0);
    const [daysWraps, setDaysWraps] = useState(0);

    const monthsX = useSharedValue(0);

    const jumpToDate = (date: Date) => {
      wrappedDaysRef.current?.jumpToDate(date);
    };

    const onPressMonth = (date: Date) => {
      const targetDate =
        value !== undefined &&
        value.getFullYear() === date.getFullYear() &&
        value.getMonth() === date.getMonth()
          ? value
          : date;

      jumpToDate(targetDate);
    };

    useImperativeHandle(ref, () => ({
      jumpToDate,
    }));

    return (
      <View>
        <WrappedMonths
          startDate={startDate}
          x={monthsX}
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
          wraps={daysWraps}
          onChangeWraps={setDaysWraps}
          startDate={startDate}
          onPress={onChange}
          formatDayLabel={formatDayLabel}
          formatDay={formatDay}
          value={value}
          width={width}
          x={daysX}
        />
      </View>
    );
  },
);

export default React.memo(CalendarStrip);
