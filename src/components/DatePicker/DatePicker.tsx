import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';

import { CalendarDate, Calendar as calendarBase } from 'calendar-base';

import Calendar from './Calendar';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button';

export interface DatePickerProps {
  date: Date;
  onDateChange?: (date: Date) => void;
  locale: string;
  onCloseCalendar?: () => void;
}

function DatePicker({ date, onDateChange, locale }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;
  const calendar = useMemo(() => new calendarBase(), []);

  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const onCloseCalendar = useCallback(() => setCalendarVisible(false), []);

  const onPress = useCallback(() => {
    setCalendarVisible(true);
  }, []);

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

  const contentCalendar = useMemo(() => {
    return (
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

  return (
    <View>
      <Button onPress={onPress} text="DatePicker" />
      <BottomSheet
        height={410}
        visible={calendarVisible}
        onClose={onCloseCalendar}
      >
        {contentCalendar}
        <View
          style={{
            padding: 10,
          }}
        >
          <Button color="primary" text="Done" onPress={onCloseCalendar} />
        </View>
      </BottomSheet>
    </View>
  );
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
};

export default React.memo(DatePicker);
