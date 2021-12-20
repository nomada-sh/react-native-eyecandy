import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, View } from 'react-native';

import { Calendar as calendarBase } from 'calendar-base';
import Calendar from './Calendar';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button';

export interface DatePickerProps {
  date: Date; // = new Date();
  locale: string; // = 'en-US';
  onDateChange?: (date: Date) => void;
  onCloseCalendar?: () => void;
}

function DatePicker({ date, onDateChange, locale }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;
  const calendar = useMemo(() => new calendarBase(), []);

  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const onCloseCalendar = useCallback(() => setCalendarVisible(false), []);

  const getCalendar = useCallback(
    (year: number, month: number) => {
      return calendar.getCalendar(year, month);
    },
    [calendar],
  );

  const onPress = useCallback(() => {
    setCalendarVisible(true);
  }, []);

  const contentCalendar = useMemo(() => {
    return (
      <Calendar
        width={width}
        getCalendar={getCalendar}
        locale={locale}
        date={date}
        onDateChange={onDateChange}
      />
    );
  }, [date, getCalendar, locale, onDateChange, width]);

  const formattedDate = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }).format(date),
    [date, locale],
  );

  return (
    <View>
      <Button onPress={onPress} text={formattedDate} />
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
