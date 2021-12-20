import React, { useCallback, useMemo, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import type { CalendarDate } from 'calendar-base';

import Days from './Days';
import Header from './Header';
import Actions from './Actions';

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import loop from '../loop';

export interface CalendarProps {
  width: number;
  date: Date;
  locale?: string;
  style?: StyleProp<ViewStyle>;
  getCalendar: (year: number, month: number) => (false | CalendarDate)[];
  debug?: boolean;
  onPressDay?: (value: CalendarDate) => void;
  onPressYear?: () => void;
  onPressMonth?: () => void;
  onPressToday?: () => void;
  animateOnPressToday?: boolean;
  onDateChange?: (date: Date) => void;
}

function Month({
  month,
  year,
  getCalendar,
  locale,
  selectedDate: selectedDateProp,
  width,
  index,
  onPressDay,
  onPressYear,
  onPressMonth,
  onPressToday,
  x,
  size,
}: any) {
  const days = useMemo(
    () => getCalendar(year, month),
    [getCalendar, year, month],
  );

  const selectedDate = useMemo(
    () => ({
      year: selectedDateProp.getFullYear(),
      month: selectedDateProp.getMonth(),
      day: selectedDateProp.getDate(),
    }),
    [selectedDateProp],
  );

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
  date,
  onDateChange,
  style,
  getCalendar,
  width,
}: CalendarProps) {
  const createMonths = useCallback((date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    return [
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
    ];
  }, []);

  const [months, setMonths] = useState(createMonths(date));

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

  const onPressDay = useCallback(
    (value: CalendarDate) => {
      onDateChange?.(new Date(value.year, value.month, value.day));
    },
    [onDateChange],
  );

  const x = useSharedValue(0);
  const index = useSharedValue(1);

  const onPressToday = useCallback(() => {
    onDateChange?.(new Date());

    const current = months[index.value];

    const from = new Date(current.year, current.month, 1);
    const to = new Date();

    const same =
      to.getFullYear() === from.getFullYear() &&
      to.getMonth() === from.getMonth();

    const direction = same ? 0 : to < from ? -1 : 1;

    if (direction === 0) return;

    setMonths(createMonths(to));

    index.value = 1;
    x.value = withTiming(0, {
      duration: 200,
    });
  }, [createMonths, index, months, onDateChange, x]);

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
        index.value = loop(index.value - direction, 0, 3);
        const next = loop(index.value + 1, 0, 3);
        const prev = loop(index.value - 1, 0, 3);

        x.value = withTiming(
          exact + direction * width,
          { duration: 300 },
          () => {
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
          onPressDay={onPressDay}
          onPressToday={onPressToday}
          selectedDate={date}
          month={month}
          year={year}
          getCalendar={getCalendar}
          width={width}
          locale={locale}
          index={index}
          x={x}
          size={months.length}
        />
      );
    });
  }, [months, onPressDay, onPressToday, date, getCalendar, width, locale, x]);

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
