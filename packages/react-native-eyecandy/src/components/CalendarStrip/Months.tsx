import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';
import enUS, { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';

import { useRippleColor } from '../../hooks';
import { Body } from '../../typography';

export interface MonthsProps {
  value?: Date;
  showSelected?: boolean;
  formatMonthLabel?: (date: Date) => string;
  onPress: (date: Date) => void;
}

const defaultFormatMonthLabel = (date: Date) => {
  return format(date, 'MMMM', {
    locale: enUS,
  });
};

function Months({
  value,
  showSelected = true,
  formatMonthLabel = defaultFormatMonthLabel,
  onPress,
}: MonthsProps) {
  const { colors } = useTheme();
  const selectedTextColor = colors.input.default.focused.indicator;
  const selectedBackgroundColor = Color(selectedTextColor).alpha(0.1).string();
  const backgroundColor = colors.background.default.container;
  const rippleColor = useRippleColor(backgroundColor).string();

  const children: React.ReactNode[] = [];
  const today = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(today.getFullYear(), i, 1);
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
          marginHorizontal: 3,
          backgroundColor: selected ? selectedBackgroundColor : backgroundColor,
          width: 85,
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
