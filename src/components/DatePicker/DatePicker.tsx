import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import Button from '../Button';
import Calendar from './Calendar';
import { CalendarDate, Calendar as CalendarUtils } from 'calendar-base';
import { useUpdateEffect } from 'react-use';

export interface DatePickerProps {
  date?: Date;
}

function DatePicker({ date: initialDate = new Date() }: DatePickerProps) {
  const calendar = useMemo(() => new CalendarUtils(), []);

  const [date, setDate] = useState(initialDate);

  const { year, month, day } = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }, [date]);

  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const [lang, setLang] = React.useState<'es' | 'en' | null>('en');
  const [selectedDate, setSelectedDate] = useState<CalendarDate>({
    year,
    month,
    day,
  });

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

  const onDayPress = useCallback((value: CalendarDate) => {
    setSelectedDate(value);
  }, []);

  const onGoToNextMonth = useCallback(() => {
    setCurrentMonth(prev => prev + 1);
  }, []);

  const onGoToPrevMonth = useCallback(() => {
    setCurrentMonth(prev => prev - 1);
  }, []);

  useUpdateEffect(() => {
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
    setSelectedDate({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });
  }, [date]);

  const content = useMemo(() => {
    return (
      <View>
        <Button
          text="Today"
          onPress={() => {
            setDate(new Date());
          }}
        />
        <Calendar
          getCalendar={getCalendar}
          days={days}
          onDayPress={onDayPress}
          selectedDate={selectedDate}
          lang={lang}
          month={currentMonth}
          year={currentYear}
          onGoToNextMonth={onGoToNextMonth}
          onGoToPrevMonth={onGoToPrevMonth}
        />
      </View>
    );
  }, [
    currentMonth,
    currentYear,
    days,
    getCalendar,
    lang,
    onDayPress,
    onGoToNextMonth,
    onGoToPrevMonth,
    selectedDate,
  ]);

  return <View>{content}</View>;
}

/*
      <Select
        value={lang}
        onValueChange={value => setLang(value as typeof lang)}
        items={[
          {
            label: 'English',
            value: 'en',
          },
          {
            label: 'Spanish',
            value: 'es',
          },
        ]}
      />
      */

export default DatePicker;
