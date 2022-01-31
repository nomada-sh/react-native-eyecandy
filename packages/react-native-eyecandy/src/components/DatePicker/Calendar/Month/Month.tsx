import React, {useMemo} from 'react';

import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';

import type {CalendarDate} from 'calendar-base';

import Header from '../Header';
import Actions from '../Actions';
import Days from '../Days';
import wrap from '../../wrap';

export interface MonthProps {
  month: number;
  year: number;
  getCalendar: (year: number, month: number) => (false | CalendarDate)[];
  locale?: string;
  selectedDate: Date;
  width: number;
  index: number;
  onPressDay: (value: CalendarDate) => void;
  onPressYear: () => void;
  onPressMonth: () => void;
  onPressToday: () => void;
  x: SharedValue<number>;
  size: number;
  todayText?: string;
}

function Month({
  month,
  year,
  getCalendar,
  locale,
  selectedDate: selectedDateProp,
  width,
  index,
  onPressDay,
  onPressYear,
  onPressMonth,
  onPressToday,
  x,
  size,
  todayText,
}: MonthProps) {
  const days = useMemo(
    () => getCalendar(year, month),
    [getCalendar, year, month],
  );

  const selectedDate = useMemo(
    () => ({
      year: selectedDateProp.getFullYear(),
      month: selectedDateProp.getMonth(),
      day: selectedDateProp.getDate(),
    }),
    [selectedDateProp],
  );

  const date = useMemo(() => new Date(year, month), [month, year]);

  const style = useAnimatedStyle(() => {
    const newX = wrap(width * size, x.value) + index * width;

    let translateX = newX - width * (size + 1);
    if (newX >= 0 && newX <= width * size) {
      translateX = newX - width;
    }

    return {
      transform: [{translateX}],
    };
  }, [x, index, width]);

  return (
    <Animated.View
      style={[
        {
          width,
          position: 'absolute',
        },
        style,
      ]}
      key={`${year}-${month}`}>
      <Actions
        date={date}
        onPressYear={onPressYear}
        onPressMonth={onPressMonth}
        onPressToday={onPressToday}
        locale={locale}
        todayText={todayText}
      />
      <Header locale={locale} month={month} year={year} />
      <Days
        data={days}
        onDayPress={onPressDay}
        selectedDate={selectedDate}
        month={month}
        year={year}
      />
    </Animated.View>
  );
}

export default Month;
