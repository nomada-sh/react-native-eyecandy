import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';

import Button from '../Button';
import Calendar from './Calendar';
import { CalendarDate, Calendar as CalendarUtils } from 'calendar-base';
import { useUpdateEffect } from 'react-use';

export interface DatePickerProps {
  date: Date;
}

function DatePicker({ date: initialDate }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;
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

  const onPressToday = useCallback(() => {
    setDate(new Date());
  }, []);

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
          width={width}
          getCalendar={getCalendar}
          days={days}
          onDayPress={onDayPress}
          selectedDate={selectedDate}
          lang={lang}
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
    lang,
    onDayPress,
    onGoToNextMonth,
    onGoToPrevMonth,
    onPressMonth,
    onPressToday,
    onPressYear,
    selectedDate,
    width,
  ]);

  useUpdateEffect(() => {
    if (!initialDate) return;

    if (
      initialDate.getFullYear() === date.getFullYear() &&
      initialDate.getMonth() === date.getMonth() &&
      initialDate.getDate() === date.getDate()
    )
      return;

    setDate(initialDate);
  }, [initialDate, setDate]);

  return <View>{content}</View>;
}

DatePicker.defaultProps = {
  date: new Date(),
};

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

export default React.memo(DatePicker);