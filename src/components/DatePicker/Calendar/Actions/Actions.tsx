import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { Body } from '../../../../typography';

export interface ActionsProps {
  date: Date;
  onPressYear: () => void;
  onPressMonth: () => void;
  onPressToday: () => void;
  locale: string;
}

function Actions({
  date,
  onPressYear,
  onPressMonth,
  onPressToday,
  locale, // = 'en-US',
}: ActionsProps) {
  const format = useCallback(
    (date: Date, options?: Intl.DateTimeFormatOptions) => {
      return new Intl.DateTimeFormat(locale, options).format(date);
    },
    [locale],
  );

  const { month, year } = useMemo(() => {
    return {
      month: format(date, {
        month: 'long',
      }),
      year: format(date, {
        year: 'numeric',
      }),
    };
  }, [date, format]);

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
          color="primary"
          onPress={onPressMonth}
        >
          {month}
        </Body>
        <Body
          style={[
            styles.text,
            {
              marginStart: 0,
            },
          ]}
          color="primary"
          onPress={onPressYear}
        >
          {year}
        </Body>
      </View>
      <Body style={styles.text} color="primary" onPress={onPressToday}>
        Today
      </Body>
    </View>
  );
}

Actions.defaultProps = {
  locale: 'en-US',
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
