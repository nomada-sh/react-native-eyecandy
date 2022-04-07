import React from 'react';
import { ScrollView } from 'react-native';

import { HorizontalDatePicker } from '@nomada-sh/react-native-eyecandy';

export default function Calendars() {
  const [value, setValue] = React.useState(new Date());

  return (
    <ScrollView>
      <HorizontalDatePicker value={value} onChange={setValue} />
    </ScrollView>
  );
}