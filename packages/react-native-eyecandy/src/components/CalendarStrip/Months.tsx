import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';
import enUS, { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';

import { useRippleColor } from '../../hooks';
import { Body } from '../../typography';

export interface MonthsProps {
  startDate: Date;
  value?: Date;
  showSelected?: boolean;
  formatMonthLabel?: (date: Date) => string;
  onPress: (date: Date) => void;
  monthWidth: number;
  monthHorizontalMargin: number;
  calculateIndex: (index: number) => number;
}

const defaultFormatMonthLabel = (date: Date) => {
  return format(date, 'MMMM YYY', {
    locale: enUS,
  });
};

function Months({
  startDate,
  value,
  showSelected = true,
  formatMonthLabel = defaultFormatMonthLabel,
  onPress,
  monthHorizontalMargin,
  monthWidth,
  calculateIndex,
}: MonthsProps) {
  const { colors } = useTheme();
  const selectedTextColor = colors.input.default.focused.indicator;
  const selectedBackgroundColor = Color(selectedTextColor).alpha(0.1).string();
  const backgroundColor = colors.background.default.container;
  const rippleColor = useRippleColor(backgroundColor).string();

  const children: React.ReactNode[] = [];

  for (let i = 0; i < 12; i++) {
    const k = calculateIndex(i);
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + k, 1);
    const selected =
      showSelected &&
      value !== undefined &&
      value.getFullYear() === date.getFullYear() &&
      value.getMonth() === date.getMonth();

    children.push(
      <View
        key={i}
        style={{
          borderRadius: 6,
          overflow: 'hidden',
          backgroundColor: selected ? selectedBackgroundColor : backgroundColor,
          width: monthWidth,
          marginHorizontal: monthHorizontalMargin,
        }}
      >
        <RectButton
          rippleColor={rippleColor}
          style={{
            flex: 1,
          }}
          onPress={() => onPress(date)}
        >
          <View
            accessible
            accessibilityRole="button"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Body
              weight="bold"
              style={{
                marginHorizontal: 6,
              }}
              key={i}
              customColor={selected ? selectedTextColor : undefined}
            >
              {formatMonthLabel(date)}
            </Body>
          </View>
        </RectButton>
      </View>,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 35,
      }}
    >
      {children}
    </View>
  );
}

export default Months;
