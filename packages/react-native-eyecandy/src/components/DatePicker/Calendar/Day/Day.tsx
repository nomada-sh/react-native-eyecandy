import React, { useMemo, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import { Body } from '../../../../typography';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import { useRippleColor } from '../../../../hooks';

export interface DayProps {
  value: CalendarDate | false;
  onPress?: (value: CalendarDate) => void;
  selected?: boolean;
  debug?: boolean;
}

function Day({ value, onPress, selected, debug }: DayProps) {
  const { palette, dark, colors } = useTheme();

  const today = useMemo(() => {
    if (!value) {
      return false;
    }

    const now = new Date();

    return (
      value.year === now.getFullYear() &&
      value.month === now.getMonth() &&
      value.day === now.getDate()
    );
  }, [value]);

  const rippleColor = useRippleColor(
    selected ? palette.primary[500] : colors.background.default.container,
  );

  const backgroundColor = useMemo(() => {
    if (selected) {
      return palette.primary[500];
    }
    if (today) {
      return palette.grey[dark ? 800 : 200];
    }
    return 'transparent';
  }, [dark, palette.grey, palette.primary, selected, today]);

  const textColor = useMemo(() => {
    if (selected) {
      return 'white';
    }
    if (today) {
      return palette.primary[500];
    }
    return colors.text.default.normal;
  }, [colors.text.default.normal, palette.primary, selected, today]);

  const count = useRef(1);
  value &&
    debug &&
    console.log(
      'DAY',
      `${value.year}/${value.month}/${value.day}`,
      'RENDER COUNT:',
      count.current++,
    );

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          value !== false ? styles.pressable : styles.pressableHidden,
          {
            backgroundColor: backgroundColor,
          },
        ]}
        disabled={value === false}
        onPress={() => {
          if (value !== false && onPress) {
            onPress(value);
          }
        }}
        android_ripple={{
          color: rippleColor.string(),
          borderless: true,
          radius: 20,
        }}>
        <Body
          color="default"
          weight={selected ? 'bold' : 'normal'}
          style={{
            color: textColor,
          }}>
          {value !== false ? value.day : '00'}
        </Body>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '14.28%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  pressable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableHidden: {
    opacity: 0,
  },
});

export default React.memo(Day);
