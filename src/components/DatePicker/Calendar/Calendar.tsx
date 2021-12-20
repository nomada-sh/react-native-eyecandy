import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Days from './Days';
import Header from './Header';
import Actions from './Actions';

import Animated, {
  call,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useCode,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import loop from '../loop';

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

function Month({
  month,
  year,
  getCalendar,
  locale,
  selectedDate,
  width,
  index,
  onPressDay,
  onPressYear,
  onPressMonth,
  onPressToday,
  x,
  size,
  onChange,
}: any) {
  const days = useMemo(
    () => getCalendar(year, month),
    [getCalendar, year, month],
  );

  const color = useMemo(() => {
    return undefined;
    // switch (index) {
    //   case 0:
    //     return 'red';
    //   case 1:
    //     return 'green';
    //   case 2:
    //     return 'blue';
    // }
  }, []);

  const date = useMemo(() => new Date(year, month), [month, year]);

  const style = useAnimatedStyle(() => {
    function a(value: number, min: number, max: number): number {
      'worklet';
      if (value >= 0) {
        return value % max;
      } else {
        return a(max + value, min, max);
      }
    }
    const newX = a(x.value, 0, width * 3) + index * width;

    let translateX = newX - width * 4;
    if (newX >= 0 && newX <= width * 3) translateX = newX - width;

    return {
      transform: [{ translateX }],
    };
  }, [x, index, width]);

  return (
    <Animated.View
      style={[
        {
          width,
          backgroundColor: color,
          position: 'absolute',
        },
        style,
      ]}
      key={`${year}-${month}`}
    >
      <Actions
        date={date}
        onPressYear={onPressYear}
        onPressMonth={onPressMonth}
        onPressToday={onPressToday}
        locale={locale}
      />
      <Header locale={locale} month={month} year={year} />
      <Days
        data={days}
        onDayPress={onPressDay}
        selectedDate={selectedDate}
        month={month}
        year={year}
      />
    </Animated.View>
  );
}

type Context = {
  startX: number;
};

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
  const [months, setMonths] = useState([
    {
      year,
      month: month - 1,
    },
    {
      year,
      month,
    },
    {
      year,
      month: month + 1,
    },
  ]);

  const x = useSharedValue(0);
  const index = useSharedValue(1);

  const handlePressToday = useCallback(() => {
    onPressToday();
  }, [onPressToday]);

  const onChange = useCallback(
    (index: number, nextIndex: number, prevIndex: number) => {
      const current = months[index];

      const newMonths = [...months];

      newMonths[nextIndex] = {
        year: current.year,
        month: current.month + 1,
      };
      newMonths[prevIndex] = {
        year: current.year,
        month: current.month - 1,
      };

      setMonths(newMonths);
    },
    [months],
  );

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (e, ctx) => {
      x.value = ctx.startX + e.translationX;
    },
    onEnd: (e, ctx) => {
      const threshold = width / 3;
      const direction = e.translationX > 0 ? 1 : -1;

      const exact = Math.round(ctx.startX / width) * width;

      if (Math.abs(e.translationX) > threshold) {
        x.value = withTiming(
          exact + direction * width,
          { duration: 300 },
          () => {
            index.value = loop(index.value - direction, 0, 3);
            const next = loop(index.value + 1, 0, 3);
            const prev = loop(index.value - 1, 0, 3);

            runOnJS(onChange)(index.value, next, prev);
          },
        );
      } else {
        x.value = withTiming(exact, { duration: 300 });
      }
    },
  });

  const content = useMemo(() => {
    return months.map(({ year, month }, index) => {
      return (
        <Month
          key={`${year}-${month}`}
          onPressDay={onDayPress}
          onPressToday={handlePressToday}
          selectedDate={selectedDate}
          month={month}
          year={year}
          getCalendar={getCalendar}
          width={width}
          locale={locale}
          index={index}
          x={x}
          size={3}
        />
      );
    });
  }, [
    getCalendar,
    handlePressToday,
    locale,
    months,
    onDayPress,
    selectedDate,
    width,
    x,
  ]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          width,
          flexDirection: 'row',
          flex: 1,
        }}
      >
        {content}
      </Animated.View>
    </PanGestureHandler>
  );
}

export default React.memo(Calendar);
