import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import Button from '../../../Button';
import { Body } from '../../../../typography';

export interface YearMonthSelectionProps {
  step?: 'year' | 'month';
  onPressYear?: (date: Date) => void;
  onPressMonth?: (date: Date) => void;
  goToYears?: () => void;
  locale: string;
  date: Date;
  selectedDate: Date;
}

const YEARS = 50;

function YearMonthSelection({
  step,
  date,
  locale,
  onPressMonth,
  onPressYear,
  goToYears,
  selectedDate,
}: YearMonthSelectionProps) {
  const { yearNow, monthNow } = useMemo(() => {
    const now = new Date();
    return {
      yearNow: now.getFullYear(),
      monthNow: now.getMonth(),
    };
  }, []);

  const { year, month } = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  const formatMonth = useCallback(
    (month: number) => {
      return new Intl.DateTimeFormat([locale, 'en-US'], {
        month: 'long',
      }).format(new Date(year, month, 1));
    },
    [locale, year],
  );

  const initialIndexRef = useRef(0);

  const years = useMemo(() => {
    const years: number[][] = [];
    for (let i = year - YEARS; i <= year + YEARS; i += 4) {
      const group: number[] = [];
      for (let j = 0; j < 4; j++) {
        const y = i + j;
        if (y === year) initialIndexRef.current = years.length - 2;
        group.push(y);
      }
      years.push(group);
    }
    return years;
  }, [year]);

  const months = useMemo(() => {
    const months: Array<Array<{ month: number; name: string }>> = [];

    for (let i = 0; i < 4; i++) {
      const group = [];

      for (let j = 0; j < 3; j++)
        group.push({
          month: i * 3 + j,
          name: formatMonth(i * 3 + j),
        });

      months.push(group);
    }
    return months;
  }, [formatMonth]);

  if (step === 'year')
    return (
      <View style={styles.container}>
        <FlatList
          initialScrollIndex={initialIndexRef.current}
          getItemLayout={(_, index) => ({
            length: 55,
            offset: 55 * index,
            index,
          })}
          contentContainerStyle={[
            styles.flatlist,
            {
              paddingTop: 0,
            },
          ]}
          data={years}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row' }}>
                {item.map(y => (
                  <View key={y} style={styles.year}>
                    <Button
                      style={styles.yearButton}
                      onPress={() => onPressYear?.(new Date(y, month))}
                      color={
                        y === year || y === yearNow ? 'primary' : 'default'
                      }
                      inverse={y === yearNow && y !== year}
                      text={y.toString()}
                    />
                  </View>
                ))}
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );

  if (step === 'month')
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Body onPress={goToYears} size="large" color="primary" weight="bold">
            {year}
          </Body>
        </View>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={months}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: 'row' }}>
                {item.map(({ month: m, name }) => (
                  <View key={name} style={styles.month}>
                    <Button
                      onPress={() => onPressMonth?.(new Date(year, m))}
                      color={
                        m === month || (yearNow === year && m === monthNow)
                          ? 'primary'
                          : 'default'
                      }
                      inverse={
                        year === yearNow && m === monthNow && m !== month
                      }
                      text={name}
                    />
                  </View>
                ))}
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );

  return null;
}

YearMonthSelection.defaultProps = {
  locale: 'en-US',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    padding: 10,
  },
  month: {
    padding: 6,
    width: '33%',
  },
  year: {
    padding: 6,
    width: '25%',
    height: 55,
  },
  yearButton: {
    height: 55 - 12,
  },
  titleContainer: {
    padding: 16,
    paddingBottom: 0,
    alignItems: 'center',
  },
});

export default React.memo(YearMonthSelection);
