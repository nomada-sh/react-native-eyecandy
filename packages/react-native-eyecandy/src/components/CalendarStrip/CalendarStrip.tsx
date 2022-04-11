import React, { useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { compareAsc, differenceInDays } from 'date-fns';
import {
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import WrappedDays from './WrappedDays';
import WrappedMonths from './WrappedMonths';

export interface CalendarStripProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  formatMonthLabel?: (date: Date) => string;
  value?: Date;
  onChange?: (date: Date) => void;
}

function CalendarStrip({
  width: widthProp,
  formatDay,
  formatDayLabel,
  formatMonthLabel,
  value,
  onChange,
}: CalendarStripProps) {
  const { colors } = useTheme();
  const { width: windowWidth } = useWindowDimensions();

  const today = useRef(new Date()).current;
  const width = widthProp !== undefined ? widthProp : windowWidth;
  const dayWidth = 60;
  const dayHorizontalMargin = 6;
  const wrappedDayWidth = dayWidth + 2 * dayHorizontalMargin;
  const wrappedDaysWidth = Math.round(width / dayWidth) * wrappedDayWidth;

  const daysX = useSharedValue(0);
  const monthsX = useSharedValue(0);

  const onPressMonth = (date: Date) => {
    let targetDate = date;
    if (
      value !== undefined &&
      value.getFullYear() === date.getFullYear() &&
      value.getMonth() === date.getMonth()
    ) {
      targetDate = value;
    }

    const diff = Math.abs(differenceInDays(targetDate, today));
    const direction = compareAsc(targetDate, today);

    const newDaysX =
      -direction * (diff + (direction > 0 ? 1 : 0)) * wrappedDayWidth;
    // daysX.value = withTiming(newDaysX, { duration: 300 });
    daysX.value = withSpring(newDaysX, {
      damping: 20,
    });
  };

  return (
    <View>
      <WrappedMonths
        startDate={today}
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
        startDate={today}
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

export default React.memo(CalendarStrip);
