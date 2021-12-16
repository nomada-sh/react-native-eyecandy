import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Day from '../Day';

export interface DaysProps {
  data?: Array<false | CalendarDate>;
  onDayPress?: (value: CalendarDate) => void;
  testMonth?: number;
  testYear?: number;
}

function Days({ data = [], onDayPress, testMonth, testYear }: DaysProps) {
  /*
  useEffect(() => {
    console.log('DAYS: Rendered', `${testMonth}/${testYear}`);
    return () => {
      console.log('DAYS: Unmounted', `${testMonth}/${testYear}`);
    };
  }, [data, onDayPress, testMonth, testYear]);
  */

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
