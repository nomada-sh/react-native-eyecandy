import React, { useCallback } from 'react';
import { FlatList, View, Dimensions, ListRenderItem } from 'react-native';

import Calendar from './Calendar';
import Select from '../Select';

export interface DatePickerProps {}

const months = [9, 10, 11];

function DatePicker({}: DatePickerProps) {
  const [lang, setLang] = React.useState<'es' | 'en' | null>('en');

  const renderItem = useCallback<ListRenderItem<number>>(
    ({ item, index }) => {
      return (
        <Calendar
          lang={lang}
          month={item}
          style={{
            backgroundColor: index % 2 === 0 ? '#fff' : '#eee',
          }}
        />
      );
    },
    [lang],
  );

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
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
        keyExtractor={item => item.toString()}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={months}
        renderItem={renderItem}
      />
    </View>
  );
}

export default DatePicker;
