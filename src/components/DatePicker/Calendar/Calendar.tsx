import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';

import { useUpdateEffect } from 'react-use';
import { Calendar as CalendarBase, CalendarDate } from 'calendar-base';

import Days from './Days';
import Header from './Header';
import mountTest from '../mountTest';

export interface CalendarProps {
  year?: number;
  month?: number;
  lang?: 'en' | 'es' | null | false;
  style?: StyleProp<ViewStyle>;
}

function Calendar({
  lang,
  year: initialYear,
  month: initialMonth,
  style,
}: CalendarProps) {
  const calendar = useMemo(() => new CalendarBase(), []);
  const now = useMemo(() => new Date(), []);

  const [year, setYear] = useState(initialYear || now.getFullYear());
  const [month, setMonth] = useState(initialMonth || now.getMonth());

  const actualMonth = useMemo(
    () => new Date(year, month).getMonth(),
    [year, month],
  );

  const actualYear = useMemo(
    () => new Date(year, month).getFullYear(),
    [year, month],
  );

  const calendarMonth = useMemo(
    () => calendar.getCalendar(year, month),
    [calendar, year, month],
  );

  const onDayPress = useCallback((value: CalendarDate) => {
    console.log(value);
  }, []);

  useUpdateEffect(() => {
    if (initialYear !== undefined) setYear(initialYear);
    if (initialMonth !== undefined) setMonth(initialMonth);
  }, [initialMonth, initialYear]);

  useEffect(() => {
    const monthStr =
      actualMonth.toString().length === 1 ? `0${actualMonth}` : actualMonth;
    const key = `${actualYear}/${monthStr}`;

    mountTest[key] = true;

    const ordered = Object.keys(mountTest)
      .sort()
      .reduce((obj, key) => {
        obj[key] = mountTest[key];
        return obj;
      }, {} as any);

    console.log(JSON.stringify(ordered, null, 2));

    return () => {
      delete mountTest[key];
      //mountTest[key] = false;
    };
  }, [actualMonth, actualYear]);

  return (
    <View
      style={[
        {
          width: Dimensions.get('window').width,
        },
        style,
      ]}
    >
      <Header lang={lang} />
      <Days data={calendarMonth} onDayPress={onDayPress} />
    </View>
  );
}

export default React.memo(Calendar);
