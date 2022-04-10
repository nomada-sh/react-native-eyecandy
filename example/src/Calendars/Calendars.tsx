import React from 'react';
import { ScrollView } from 'react-native';

import { Body, CalendarStrip } from '@nomada-sh/react-native-eyecandy';

export default function Calendars() {
  const [value, setValue] = React.useState(new Date());

  return (
    <ScrollView>
      <CalendarStrip value={value} onChange={setValue} />
      <Body>{value.toLocaleDateString()}</Body>
    </ScrollView>
  );
}
