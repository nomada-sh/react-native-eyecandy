import React from 'react';
import { View } from 'react-native';

import { DatePicker } from '@nomada-sh/react-native-eyecandy';

export default function DatePickerFeature() {
  const [date, setDate] = React.useState(new Date());

  return (
    <View>
      <DatePicker date={date} onDateChange={setDate} />
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
