import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import Calendar from './Calendar';
import { CalendarDate, Calendar as CalendarUtils } from 'calendar-base';

export interface DatePickerProps {
  date?: Date;
}

function DatePicker({ date = new Date() }: DatePickerProps) {
  const calendar = useMemo(() => new CalendarUtils(), []);

  const { year, month, day } = useMemo(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return {
      year,
      month,
      day,
    };
  }, [date]);

  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const [lang, setLang] = React.useState<'es' | 'en' | null>('en');
  const [selectedDate, setSelectedDate] = useState<CalendarDate>({
    year: currentYear,
    month: currentMonth,
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

  const content = useMemo(() => {
    return (
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
