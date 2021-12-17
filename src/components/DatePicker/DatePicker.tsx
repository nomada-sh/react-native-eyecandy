import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';

import Calendar from './Calendar';
import { CalendarDate, Calendar as CalendarUtils } from 'calendar-base';

export interface DatePickerProps {
  date: Date;
  onDateChange?: (date: Date) => void;
  locale: string;
}

function DatePicker({ date, onDateChange, locale }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;
  const calendar = useMemo(() => new CalendarUtils(), []);

  const selectedDate = useMemo((): CalendarDate => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }, [date]);

  const { year, month } = selectedDate;

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const days = useMemo(
    () => calendar.getCalendar(currentYear, currentMonth),
    [calendar, currentMonth, currentYear],
  );

  const getCalendar = useCallback(
    (year: number, month: number) => {
      return calendar.getCalendar(year, month);
    },
    [calendar],
  );

  const onDayPress = useCallback(
    (value: CalendarDate) => {
      onDateChange?.(new Date(value.year, value.month, value.day));
    },
    [onDateChange],
  );

  const onPressToday = useCallback(() => {
    const now = new Date();

    onDateChange?.(now);
    setCurrentYear(now.getFullYear());
    setCurrentMonth(now.getMonth());
  }, [onDateChange]);

  const onPressMonth = useCallback(() => {
    console.log('onPressMonth');
  }, []);

  const onPressYear = useCallback(() => {
    console.log('onPressYear');
  }, []);

  const onGoToNextMonth = useCallback(() => {
    setCurrentMonth(prev => prev + 1);
  }, []);

  const onGoToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => prev - 1);
  }, []);

  const content = useMemo(() => {
    return (
      <View>
        <Calendar
          width={width}
          getCalendar={getCalendar}
          days={days}
          onDayPress={onDayPress}
          selectedDate={selectedDate}
          locale={locale}
          month={currentMonth}
          year={currentYear}
          onGoToNextMonth={onGoToNextMonth}
          onGoToPrevMonth={onGoToPrevMonth}
          onPressToday={onPressToday}
          onPressMonth={onPressMonth}
          onPressYear={onPressYear}
          animateOnPressToday
        />
      </View>
    );
  }, [
    currentMonth,
    currentYear,
    days,
    getCalendar,
    locale,
    onDayPress,
    onGoToNextMonth,
    onGoToPrevMonth,
    onPressMonth,
    onPressToday,
    onPressYear,
    selectedDate,
    width,
  ]);

  return <View>{content}</View>;
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
};

export default React.memo(DatePicker);
