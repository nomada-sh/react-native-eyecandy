import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Day from '../Day';

export interface DaysProps {
  data?: Array<false | CalendarDate>;
  onDayPress: (value: CalendarDate) => void;
}

function Days({ data = [], onDayPress }: DaysProps) {
  useEffect(() => {
    console.log('Days: rerender');
  }, [data, onDayPress]);

  return (
    <View style={styles.container}>
      {data.map((day, index) => {
        return <Day onPress={onDayPress} key={index} value={day} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default React.memo(Days);
