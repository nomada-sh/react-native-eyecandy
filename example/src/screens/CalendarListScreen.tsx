import React from 'react';
import { View } from 'react-native';

import { CalendarList } from '@nomada-sh/react-native-eyecandy';

export function CalendarListScreen() {
  return (
    <View style={{ flex: 1 }}>
      <CalendarList />
    </View>
  );
}
