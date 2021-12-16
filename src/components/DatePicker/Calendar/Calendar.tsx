import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';

import { useUpdateEffect } from 'react-use';
import type { Calendar as CalendarUtils, CalendarDate } from 'calendar-base';

import { Body } from '../../../typography';

import Days from './Days';
import Header from './Header';

export interface CalendarProps {
  year: number;
  month: number;
  lang?: 'en' | 'es' | null | false;
  style?: StyleProp<ViewStyle>;
  selectedDate?: CalendarDate;
  onDayPress?: (value: CalendarDate) => void;
  days: (false | CalendarDate)[];
  getCalendar: (year: number, month: number) => (false | CalendarDate)[];
}

function Calendar({
  lang,
  year,
  month,
  style,
  selectedDate,
  onDayPress,
  getCalendar,
}: CalendarProps) {
  const count = useRef(1);

  const days = useMemo(() => {
    console.log(
      'CALENDAR CREATING DAYS',
      `${month}/${year},`,
      'CREATION COUNT:',
      count.current++,
    );
    return getCalendar(year, month);
  }, [getCalendar, year, month]);

  return (
    <View
      style={[
        {
          width: Dimensions.get('window').width,
        },
        style,
      ]}
    >
      <View>
        <Body>
          {year}/{month}
        </Body>
      </View>
      <Header lang={lang} month={month} year={year} />
      <Days
        data={days}
        onDayPress={onDayPress}
        selectedDate={selectedDate}
        month={month}
        year={year}
      />
    </View>
  );
}

export default React.memo(Calendar);
