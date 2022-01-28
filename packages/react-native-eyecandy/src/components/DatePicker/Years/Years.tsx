import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Body } from '../../../typography';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import Button from '../../Button';

export interface YearsProps {
  onPressBack?: () => void;
  year: number;
  maxYears: number;
  onPressYear: (year: number) => void;
}

function Years({ onPressBack, year, maxYears, onPressYear }: YearsProps) {
  const background = useColors(c => c.background.default);

  const years = useMemo(() => {
    const years = [];
    for (let i = year - maxYears; i <= year + maxYears; i++) {
      years.push(i);
    }
    return years;
  }, [maxYears, year]);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: background.content,
        },
      ]}
    >
      <View
        style={{
          margin: 16,
          marginBottom: 4,
        }}
      >
        <Body onPress={onPressBack} color="primary" weight="bold">
          Back
        </Body>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          paddingTop: 0,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        showsVerticalScrollIndicator={false}
      >
        {years.map(y => (
          <View
            key={y}
            style={{
              width: '33%',
              padding: 8,
            }}
          >
            <Button
              onPress={() => onPressYear(y)}
              buttonStyle={{
                height: 50,
              }}
              color={year === y ? 'primary' : 'default'}
              text={y.toString()}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

Years.defaultProps = {
  maxYears: 80,
};

export default Years;
