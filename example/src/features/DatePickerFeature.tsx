import React from 'react';
import { View } from 'react-native';

import {
  DatePicker,
  Body,
  BottomSheet,
} from '@nomada-sh/react-native-eyecandy';

export default function DatePickerFeature() {
  const [date, setDate] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <DatePicker
        date={date}
        onDateChange={setDate}
        calendarVisible={visible}
        onCloseCalendar={() => setVisible(false)}
        onPress={() => setVisible(true)}
      />
      <Body align="center" weight="bold">
        {Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
          day: 'numeric',
        }).format(date)}
      </Body>
    </View>
  );
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
