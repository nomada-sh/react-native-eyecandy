import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import Button from '../../../Button';
import { Body } from '../../../../typography';
import { useUpdateEffect } from 'react-use';
import formatDate from '../../formatDate';

import type { Locale } from 'date-fns';

export interface YearMonthSelectionProps {
  step?: 'year' | 'month';
  onChange?: (date: Date) => void;
  goToYears?: () => void;
  locale: Locale;
  date: Date;
  selectedDate: Date;
  setStep?: (step: 'year' | 'month' | undefined) => void;
}

const YEARS = 50;

function YearMonthSelection({
  step,
  date: visibleDate,
  locale,
  onChange,
  goToYears,
  selectedDate,
  setStep,
}: YearMonthSelectionProps) {
  const { yearSelected, monthSelected } = useMemo(() => {
    return {
      yearSelected: selectedDate.getFullYear(),
      monthSelected: selectedDate.getMonth(),
    };
  }, [selectedDate]);

  const { yearNow, monthNow } = useMemo(() => {
    const now = new Date();
    return {
      yearNow: now.getFullYear(),
      monthNow: now.getMonth(),
    };
  }, []);

  const { initialYear } = useMemo(() => {
    return {
      initialYear: visibleDate.getFullYear(),
      initialMonth: visibleDate.getMonth(),
    };
  }, [visibleDate]);

  const [year, setYear] = useState(initialYear);

  const formatMonth = useCallback(
    (month: number) => {
      const formattedMonth = formatDate(
        new Date(initialYear, month, 1),
        'MMMM',
        locale,
      );

      return formattedMonth[0].toUpperCase() + formattedMonth.slice(1);
    },
    [locale, initialYear],
  );

  const initialYearIndexRef = useRef(0);

  const years = useMemo(() => {
    const years: number[][] = [];
    for (let i = initialYear - YEARS; i <= initialYear + YEARS; i += 4) {
      const group: number[] = [];
      for (let j = 0; j < 4; j++) {
        const y = i + j;
        if (y === initialYear) {
          initialYearIndexRef.current = years.length - 2;
        }
        group.push(y);
      }
      years.push(group);
    }
    return years;
  }, [initialYear]);

  const months = useMemo(() => {
    const months: Array<Array<{ month: number; name: string }>> = [];

    for (let i = 0; i < 4; i++) {
      const group = [];

      for (let j = 0; j < 3; j++) {
        group.push({
          month: i * 3 + j,
          name: formatMonth(i * 3 + j),
        });
      }

      months.push(group);
    }
    return months;
  }, [formatMonth]);

  useUpdateEffect(() => {
    setYear(initialYear);
  }, [initialYear]);

  if (step === 'year') {
    return (
      <View style={styles.container}>
        <FlatList
          initialScrollIndex={initialYearIndexRef.current}
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
                      //onPress={() => onPressYear?.(new Date(y, month))}
                      onPress={() => {
                        setYear(y);
                        setStep?.('month');
                      }}
                      color={
                        y === yearSelected || y === yearNow
                          ? 'primary'
                          : 'default'
                      }
                      inverse={y === yearNow && y !== yearSelected}
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
  }

  if (step === 'month') {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Body onPress={goToYears} size="xlarge" color="primary" weight="bold">
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
                      onPress={() => onChange?.(new Date(year, m))}
                      color={
                        (m === monthSelected && year === yearSelected) ||
                        (m === monthNow && year === yearNow)
                          ? 'primary'
                          : 'default'
                      }
                      inverse={
                        m === monthNow &&
                        year === yearNow &&
                        m !== monthSelected
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
  }

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
