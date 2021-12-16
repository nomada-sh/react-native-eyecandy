import React, { useCallback } from 'react';
import { FlatList, View, Dimensions, ListRenderItem } from 'react-native';

import Calendar from './Calendar';
import Select from '../Select';

export interface DatePickerProps {}

const months = new Array(1000).fill(0).map((_, index) => index);

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

  const onViewableItemsChanged = useCallback((info: any) => {
    console.log(info.viewableItems);
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
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        initialScrollIndex={100}
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
