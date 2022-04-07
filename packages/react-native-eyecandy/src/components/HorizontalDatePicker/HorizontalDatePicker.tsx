import React, { useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import enUS, { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated';

import { useRippleColor } from '../../hooks';
import { Body } from '../../typography';
import WrappedScrollView from '../WrappedScrollView';

export interface HorizontalDatePickerProps {
  width?: number;
  formatDayLabel?: (date: Date) => string;
  formatDay?: (date: Date) => string;
  value?: Date;
  onChange?: (date: Date) => void;
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

export default function HorizontalDatePicker({
  width: widthProp,
  formatDay = defaultFormatDay,
  formatDayLabel = defaultFormatDayLabel,
  value,
  onChange,
}: HorizontalDatePickerProps) {
  const { colors } = useTheme();
  const selectedBackgroundColor = colors.input.default.focused.indicator;
  const backgroundColor = colors.input.default.background;
  const rippleColor = useRippleColor(backgroundColor).string();

  const { width: windowWidth } = useWindowDimensions();

  const onPress = (date: Date) => {
    if (onChange) onChange(date);
  };

  const width = widthProp !== undefined ? widthProp : windowWidth;
  const x = useSharedValue(0);

  const childWidth = 70;

  const visibleChildrenCount = Math.round(width / childWidth);
  const visibleChildrenWidth = visibleChildrenCount * childWidth;

  const fullChildrenCount = visibleChildrenCount * 3;
  const fullChildrenWidth = fullChildrenCount * childWidth;

  // const initialIndex = Math.round(childCount / 2);
  const initialIndex = 0;

  const children: React.ReactNode[] = [];
  const today = new Date();

  for (let i = 0; i < fullChildrenCount; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i - initialIndex,
    );

    const selected =
      value !== undefined &&
      value.getFullYear() === date.getFullYear() &&
      value.getMonth() === date.getMonth() &&
      value.getDate() === date.getDate();

    children.push(
      <View
        key={i}
        style={{
          flex: 1,
          padding: 6,
        }}
      >
        <View
          style={{
            backgroundColor: selected
              ? selectedBackgroundColor
              : backgroundColor,
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
              <Body
                color="greyout"
                customColor={selected ? 'white' : undefined}
              >
                {formatDayLabel(date)}
              </Body>
            </View>
          </RectButton>
        </View>
      </View>,
    );
  }

  return (
    <WrappedScrollView
      value={x}
      initialIndex={initialIndex}
      horizontal
      size={childWidth}
      style={{
        height: 100,
      }}
    >
      {children}
    </WrappedScrollView>
  );
}
