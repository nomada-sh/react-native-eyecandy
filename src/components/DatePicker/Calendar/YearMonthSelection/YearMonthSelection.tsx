import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';

import Button from '../../../Button';
import { Body } from '../../../../typography';

export interface YearMonthSelectionProps {
  step?: 'year' | 'month';
  onPressYear?: (year: number) => void;
  onPressMonth?: (month: number) => void;
  locale: string;
  date: Date;
}

const YEARS = 50;

function YearMonthSelection({
  step,
  date,
  locale,
  onPressMonth,
  onPressYear,
}: YearMonthSelectionProps) {
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

  const formatDate = useCallback(
    (date: Date) => {
      const formattedMonth = formatMonth(date.getMonth());
      return `${formattedMonth}, ${date.getFullYear()}`;
    },
    [formatMonth],
  );

  const years = useMemo(() => {
    const years = [];
    for (let i = year - YEARS; i <= year + YEARS; i++) years.push(i);
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

  if (step === 'year') return <Body>{year}</Body>;

  if (step === 'month')
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Body size="large" color="primary" weight="bold">
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
                  <View key={name} style={styles.buttonContainer}>
                    <Button
                      onPress={() => onPressMonth?.(m)}
                      color={m === month ? 'primary' : 'default'}
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
  buttonContainer: {
    padding: 6,
    width: '33%',
  },
  titleContainer: {
    padding: 16,
    paddingBottom: 0,
    alignItems: 'center',
  },
});

export default React.memo(YearMonthSelection);
