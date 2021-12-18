import React from 'react';
import { View } from 'react-native';

import { DatePicker, Body, Select } from '@nomada-sh/react-native-eyecandy';

export default function DatePickerFeature() {
  const [date, setDate] = React.useState(new Date());
  const [locale, setLocale] = React.useState('en');

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      <Select
        value={locale}
        onValueChange={value => value && setLocale(value)}
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
      <DatePicker date={date} onDateChange={setDate} locale={locale} />
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
