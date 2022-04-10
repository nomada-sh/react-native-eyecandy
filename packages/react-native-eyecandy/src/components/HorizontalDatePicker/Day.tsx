import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import enUS, { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';

import { useRippleColor } from '../../hooks';
import { Body } from '../../typography';

export interface DayProps {
  selected?: boolean;
  onPress: (date: Date) => void;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  date: Date;
}

const defaultFormatDayLabel = (date: Date) => {
  return format(date, 'EEEEEE', {
    locale: enUS,
  });
};

const defaultFormatDay = (date: Date) => {
  return format(date, 'dd', {
    locale: enUS,
  });
};

export default function Day({
  selected,
  onPress,
  formatDayLabel = defaultFormatDayLabel,
  formatDay = defaultFormatDay,
  date,
}: DayProps) {
  const { colors } = useTheme();
  const selectedBackgroundColor = colors.input.default.focused.indicator;
  const backgroundColor = colors.input.default.background;
  const rippleColor = useRippleColor(backgroundColor).string();

  return (
    <View
      style={{
        flex: 1,
        padding: 6,
      }}
    >
      <View
        style={{
          backgroundColor: selected ? selectedBackgroundColor : backgroundColor,
          flex: 1,
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <RectButton
          rippleColor={rippleColor}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => onPress(date)}
        >
          <View
            accessible
            accessibilityRole="button"
            style={{
              alignItems: 'center',
            }}
          >
            <Body
              size="xlarge"
              weight="bold"
              customColor={selected ? 'white' : undefined}
            >
              {formatDay(date)}
            </Body>
            <Body color="greyout" customColor={selected ? 'white' : undefined}>
              {formatDayLabel(date)}
            </Body>
          </View>
        </RectButton>
      </View>
    </View>
  );
}
