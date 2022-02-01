import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Body } from '../../../../typography';
import formatDate from '../../formatDate';

import type { Locale } from 'date-fns';

export interface ActionsProps {
  date: Date;
  onPressYear: () => void;
  onPressMonth: () => void;
  onPressToday: () => void;
  locale: Locale;
  todayText: string;
}

function Actions({
  date,
  onPressYear,
  onPressMonth,
  onPressToday,
  locale, // = 'en-US',
  todayText,
}: ActionsProps) {
  const { month, year } = useMemo(() => {
    return {
      month: formatDate(date, 'MMMM', locale),
      year: formatDate(date, 'yyyy', locale),
    };
  }, [date, locale]);

  return (
    <View style={styles.container}>
      <View style={styles.monthYearContainer}>
        <Body
          style={[
            styles.text,
            {
              marginEnd: 0,
            },
          ]}
          size="xlarge"
          color="primary"
          onPress={onPressMonth}>
          {month}
        </Body>
        <Body
          style={[
            styles.text,
            {
              marginStart: 0,
            },
          ]}
          size="xlarge"
          color="primary"
          onPress={onPressYear}>
          {year}
        </Body>
      </View>
      <Body
        size="xlarge"
        style={styles.text}
        color="primary"
        onPress={onPressToday}>
        {todayText}
      </Body>
    </View>
  );
}

Actions.defaultProps = {
  locale: 'en-US',
  todayText: 'Today',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthYearContainer: {
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    padding: 10,
    marginHorizontal: 13,
    marginTop: 6,
  },
});

export default Actions;
