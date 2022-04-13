import React, { useRef } from 'react';
import { ScrollView } from 'react-native';

import {
  Body,
  Button,
  CalendarStrip,
  CalendarStripHandle,
} from '@nomada-sh/react-native-eyecandy';

export default function Calendars() {
  const [value, setValue] = React.useState(new Date());

  const ref = useRef<CalendarStripHandle>(null);

  return (
    <ScrollView>
      <CalendarStrip ref={ref} value={value} onChange={setValue} />
      <Body>{value.toLocaleDateString()}</Body>
      <Button
        variant="rounded"
        text="Today"
        color="primary"
        onPress={() => {
          setValue(new Date());
          ref.current?.jumpToDate(new Date());
        }}
      />
      <Button
        text="Jump to today"
        onPress={() => {
          ref.current?.jumpToDate(new Date());
        }}
      />
      <Button
        text="Jump to selected"
        onPress={() => {
          ref.current?.jumpToDate(value);
        }}
      />
    </ScrollView>
  );
}
