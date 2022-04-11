import React, { useImperativeHandle, useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { useSharedValue } from 'react-native-reanimated';

import WrappedDays from './WrappedDays';
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

    const dayWidth = 60;
    const dayHorizontalMargin = 6;
    const wrappedDayWidth = dayWidth + 2 * dayHorizontalMargin;

    const daysX = useSharedValue(0);
    const [daysWraps, setDaysWraps] = useState(0);
    const [visibleDate, setVisibleDate] = React.useState(new Date());

    const extraIndexOffsetRef = useRef(0);

    const monthsX = useSharedValue(0);

    const jumpToDate = (date: Date) => {
      extraIndexOffsetRef.current = -Math.round(daysX.value / wrappedDayWidth);
      setVisibleDate(new Date(date));
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
          wraps={daysWraps}
          onChangeWraps={setDaysWraps}
          startDate={startDate}
          visibleDate={visibleDate}
          extraIndexOffset={extraIndexOffsetRef.current}
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
