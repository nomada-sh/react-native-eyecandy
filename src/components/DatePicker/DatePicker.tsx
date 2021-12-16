import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View, Dimensions, ListRenderItem } from 'react-native';

import Calendar from './Calendar';
import Select from '../Select';
import { CalendarDate, Calendar as CalendarUtils } from 'calendar-base';

export interface DatePickerProps {
  year?: number;
  month?: number;
}

function DatePicker({ year = 2021, month = 0 }: DatePickerProps) {
  const calendar = useMemo(() => new CalendarUtils(), []);

  type Item = {
    year: number;
    month: number;
  };

  type ListItem = ListRenderItem<Item>;

  const months = useMemo(() => {
    const months: Array<Item> = [];

    for (let i = 0; i < 1000; i++) {
      const date = new Date(year, month + i);
      months.push({
        year: date.getFullYear(),
        month: date.getMonth(),
      });
    }

    return months;
  }, [month, year]);

  const now = useMemo(() => new Date(), []);

  const [lang, setLang] = React.useState<'es' | 'en' | null>('en');
  const [selectedDate, setSelectedDate] = useState<CalendarDate | undefined>();

  /*
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  */

  const actualDate = useMemo(() => new Date(year, month), [month, year]);

  const actualMonth = useMemo(() => actualDate.getMonth(), [actualDate]);

  const actualYear = useMemo(() => actualDate.getFullYear(), [actualDate]);

  const days = useMemo(
    () => calendar.getCalendar(year, month),
    [calendar, year, month],
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

  /*
  useUpdateEffect(() => {
    if (initialYear !== undefined) setYear(initialYear);
    if (initialMonth !== undefined) setMonth(initialMonth);
  }, [initialMonth, initialYear]);
  */

  const renderItem = useCallback<ListItem>(
    ({ item: { month, year }, index }) => {
      return (
        <Calendar
          getCalendar={getCalendar}
          days={days}
          onDayPress={onDayPress}
          selectedDate={selectedDate}
          lang={lang}
          month={month}
          year={year}
        />
      );
    },
    [days, getCalendar, lang, onDayPress, selectedDate],
  );

  /*
  const onViewableItemsChanged = useCallback((info: any) => {
    const index = info.viewableItems[0].index;
    console.log(index);
  }, []);
  */

  const keyExtractor = useCallback((item: any) => {
    return `${item.year}-${item.month}`;
  }, []);

  return (
    <View>
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
      <FlatList
        data={months}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        /*
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
        keyExtractor={item => item.toString()}
        */
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={renderItem}
      />
    </View>
  );
}

export default DatePicker;
