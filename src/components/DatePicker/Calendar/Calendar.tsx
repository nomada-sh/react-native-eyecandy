import React, { useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Days from './Days';
import Header from './Header';
import Actions from './Actions';

const GRANT_THRESHOLD = 20;

export interface CalendarProps {
  year: number;
  month: number;
  locale?: string;
  style?: StyleProp<ViewStyle>;
  selectedDate?: CalendarDate;
  onDayPress?: (value: CalendarDate) => void;
  days: (false | CalendarDate)[];
  getCalendar: (year: number, month: number) => (false | CalendarDate)[];
  debug?: boolean;
  onGoToNextMonth: () => void;
  onGoToPrevMonth: () => void;
  width: number;
  onPressYear: () => void;
  onPressMonth: () => void;
  onPressToday: () => void;
  animateOnPressToday?: boolean;
}

function Calendar({
  locale,
  year,
  month,
  style,
  selectedDate,
  onDayPress,
  getCalendar,
  onGoToNextMonth,
  onGoToPrevMonth,
  width,
  onPressMonth,
  onPressYear,
  onPressToday,
  animateOnPressToday,
}: CalendarProps) {
  const prev = useMemo(() => {
    return getCalendar(year, month - 1);
  }, [month, year, getCalendar]);

  const next = useMemo(() => {
    return getCalendar(year, month + 1);
  }, [month, year, getCalendar]);

  const current = useMemo(() => {
    return getCalendar(year, month);
  }, [month, year, getCalendar]);

  const startXRef = useRef(-width);
  const translateX = useRef(new Animated.Value(startXRef.current)).current;

  const indexRef = useRef(0);

  const handleGoToNextMonth = useCallback(() => {
    onGoToNextMonth();
  }, [onGoToNextMonth]);

  const handleGoToPrevMonth = useCallback(() => {
    onGoToPrevMonth();
  }, [onGoToPrevMonth]);

  const handlePressToday = useCallback(() => {
    onPressToday();

    if (indexRef.current === 0) return;

    if (animateOnPressToday) {
      translateX.setValue(indexRef.current > 0 ? -width * 2 : 0);

      Animated.spring(translateX, {
        toValue: -width,
        useNativeDriver: true,
        friction: 6,
      }).start();
    }

    indexRef.current = 0;
  }, [animateOnPressToday, onPressToday, translateX, width]);

  const getDirectionAndDistance = useCallback(
    (dx: number) => {
      const start = width / 2;
      const end = start + dx;
      const direction = end > start ? 1 : -1;
      const distance = Math.abs(end - start);

      return {
        direction,
        distance,
      };
    },
    [width],
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > GRANT_THRESHOLD;
      },
      onPanResponderMove: (_, gestureState) => {
        const { direction, distance } = getDirectionAndDistance(
          gestureState.dx,
        );

        translateX.setValue(startXRef.current + direction * distance);
      },
      onPanResponderRelease: (_, gestureState) => {
        const { direction, distance } = getDirectionAndDistance(
          gestureState.dx,
        );

        const threshold = width / 4;

        if (distance > threshold) {
          startXRef.current += width * direction;

          Animated.timing(translateX, {
            toValue: startXRef.current,
            useNativeDriver: true,
            duration: 300,
          }).start(() => {
            startXRef.current = -width;
            translateX.setValue(startXRef.current);
            indexRef.current -= direction;

            direction < 0 ? handleGoToNextMonth() : handleGoToPrevMonth();
          });
        } else {
          Animated.timing(translateX, {
            toValue: startXRef.current,
            useNativeDriver: true,
            duration: 300,
          }).start();
        }
      },
    }),
  ).current;

  const renderMonth = useCallback(
    (year: number, month: number, data: (CalendarDate | false)[]) => {
      const date = new Date(year, month);

      return (
        <View key={`${year}-${month}`}>
          <Actions
            date={date}
            onPressYear={onPressYear}
            onPressMonth={onPressMonth}
            onPressToday={handlePressToday}
            locale={locale}
          />
          <Header locale={locale} month={month} year={year} />
          <Days
            data={data}
            onDayPress={onDayPress}
            selectedDate={selectedDate}
            month={month}
            year={year}
          />
        </View>
      );
    },
    [
      handlePressToday,
      locale,
      onDayPress,
      onPressMonth,
      onPressYear,
      selectedDate,
    ],
  );

  const months = useMemo(() => {
    return [
      renderMonth(year, month - 1, prev),
      renderMonth(year, month, current),
      renderMonth(year, month + 1, next),
    ];
  }, [current, next, prev, renderMonth, year, month]);

  return (
    <Animated.View
      style={[
        {
          width,
        },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
          flexDirection: 'row',
        }}
      >
        {months}
      </Animated.View>
    </Animated.View>
  );
}

export default React.memo(Calendar);
