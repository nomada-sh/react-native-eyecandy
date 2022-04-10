import React, { useRef, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import enUS, { format } from 'date-fns';
import { RectButton } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

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

  const uWidth = 70;

  const l = Math.round(width / uWidth);
  const lWidth = l * uWidth;

  // C needs to be an odd number.
  const C = 5;
  const L = C * l;

  const initialIndex = 0;

  const initialX = -initialIndex * uWidth;
  const x = useSharedValue(initialX);
  const selectedWRef = useRef(0);

  const [w, setW] = useState(0);

  const H = (w: number) => Math.floor(w / C);

  useAnimatedReaction(
    () => -x.value,
    x => {
      runOnJS(setW)(Math.floor(x / lWidth));
    },
  );

  const children: React.ReactNode[] = [];
  const today = new Date();

  for (let i = 0; i < L; i++) {
    const f = Math.floor(i / l);
    const li = f * l;
    const wi = w - f;
    const j = li + L * Math.floor((wi - H(wi)) / (C - 1));
    const k = j + (i % l) - initialIndex;

    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + k,
    );

    const selected =
      (selectedWRef.current === w ||
        selectedWRef.current === w - 1 ||
        selectedWRef.current === w + 1) &&
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
            onPress={() => {
              onPress(date);
              selectedWRef.current = w;
            }}
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
    <>
      <WrappedScrollView
        value={x}
        horizontal
        size={uWidth}
        style={{
          height: 100,
          // width: 100,
          // marginLeft: 100,
        }}
      >
        {children}
      </WrappedScrollView>
      <Body>w: {w}</Body>
      <Body>H: {H}</Body>
    </>
  );
}
