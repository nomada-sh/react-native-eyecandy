import React, { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
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

//const GRANT_THRESHOLD = 20;

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

function loopNumber(value: number, min: number, max: number): number {
  'worklet';
  if (value >= 0) {
    return value % max;
  } else {
    return loopNumber(max + value, min, max);
  }
}

function Month({
  month,
  year,
  getCalendar,
  locale,
  onDayPress,
  selectedDate,
  width,
  index,
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

  const color = useMemo(() => {
    switch (index) {
      case 0:
        return 'yellow';
      case 1:
        return 'green';
      case 2:
        return 'blue';
    }
  }, [index]);

  const date = useMemo(() => new Date(year, month), [month, year]);

  const style = useAnimatedStyle(() => {
    const newX = loopNumber(x.value, 0, width * 3) + index * width;

    let translateX = newX - width * 4;
    if (newX >= 0 && newX <= width * 3) translateX = newX - width;

    return {
      transform: [{ translateX }],
    };
  });

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
        onDayPress={onDayPress}
        selectedDate={selectedDate}
        month={month}
        year={year}
      />
    </Animated.View>
  );
}

type Context = {
  startX: number;
  translateX: number;
};

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
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
  const x = useSharedValue(0);

  const prev = useMemo(() => {
    return getCalendar(year, month - 1);
  }, [month, year, getCalendar]);

  const next = useMemo(() => {
    return getCalendar(year, month + 1);
  }, [month, year, getCalendar]);

  const current = useMemo(() => {
    return getCalendar(year, month);
  }, [getCalendar, year, month]);

  const handleGoToNextMonth = useCallback(() => {
    onGoToNextMonth();
  }, [onGoToNextMonth]);

  const handleGoToPrevMonth = useCallback(() => {
    onGoToPrevMonth();
  }, [onGoToPrevMonth]);

  const handlePressToday = useCallback(() => {
    onPressToday();
  }, [onPressToday]);

  // TODO: handle width and initialIndex changes

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Context
  >({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
      //ctx.translateX = translationX.value;
    },
    onActive: (e, ctx) => {
      //x.value = Math.max(0, ctx.startX + e.translationX) % (w.value * 4);
      //x.value = loopNumber(ctx.startX + e.translationX, 0, w.value * 4);
      //x.value = loopNumber(ctx.startX + e.translationX, 0, 100 * 3);
      x.value = ctx.startX + e.translationX;
      /*
      let newX = 0;
      if (x.value >= 0 && x.value <= w.value * 2) newX += x.value - w.value;
      else newX += x.value - w.value * 3;
      translationX.value = newX;
      */
    },
    onEnd: (e, ctx) => {
      const threshold = width / 3;
      const direction = e.translationX > 0 ? 1 : -1;

      const exact = Math.round(ctx.startX / width) * width;

      if (Math.abs(e.translationX) > threshold) {
        x.value = withTiming(exact + direction * width, { duration: 300 });
      } else {
        x.value = withTiming(exact, { duration: 300 });
      }

      // if (Math.abs(e.translationX) >= threshold) {
      //   x.value = (ctx.startX + direction * width) % (width * 4);
      //   let newX = 0;
      //   if (x.value >= 0 && x.value <= width * 2) newX = x.value - width;
      //   else newX = x.value - width * 3;
      //   translationX.value = withTiming(newX, { duration: 300 });
      //   // const newX = ctx.startX + width * direction;
      //   // translationX.value = withTiming(newX, { duration: 300 }, () => {
      //   //   /*
      //   //   direction < 0
      //   //     ? runOnJS(onGoToNextMonth)()
      //   //     : runOnJS(onGoToPrevMonth)();
      //   //     */
      //   // });

      //   // /*
      //   // offset.value -= direction;

      //   // if (index.value === 0 && direction > 0) return;
      //   // if (index.value === months.length - 1 && direction < 0) return;

      //   // index.value -= direction;
      //   // */
      // } else {
      //   x.value = ctx.startX;
      //   translationX.value = withTiming(0, { duration: 300 });
      // }
    },
  });

  const renderMonth = useCallback(
    (year: number, month: number, data: (CalendarDate | false)[]) => {
      const date = new Date(year, month);

      return (
        <Animated.View
          style={[
            {
              width,
              backgroundColor: month % 2 === 0 ? 'red' : 'yellow',
            },
          ]}
          key={`${year}-${month}`}
        >
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
        </Animated.View>
      );
    },
    [
      handlePressToday,
      locale,
      onDayPress,
      onPressMonth,
      onPressYear,
      selectedDate,
      width,
    ],
  );

  const months = useMemo(() => {
    //x.value = -width;

    return [
      renderMonth(year, month - 1, prev),
      renderMonth(year, month, current),
      renderMonth(year, month + 1, next),
    ];
  }, [renderMonth, year, month, prev, current, next]);

  /*
  useCode(
    () =>
      call([], () => {
        //console.log(months);
        x.value = -width;
      }),
    [months],
  );

  useLayoutEffect(() => {
    //x.value = -width;
    //console.log('layout');
  }, [months, width, x]);
  */

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={{
          width,
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <Month
          width={width}
          locale={locale}
          year={year}
          month={month}
          getCalendar={getCalendar}
          index={0}
          x={x}
          size={3}
        />
        <Month
          width={width}
          locale={locale}
          year={year}
          month={month + 1}
          getCalendar={getCalendar}
          index={1}
          x={x}
          size={3}
        />
        <Month
          width={width}
          locale={locale}
          year={year}
          month={month - 1}
          getCalendar={getCalendar}
          index={2}
          x={x}
          size={3}
        />
      </Animated.View>
    </PanGestureHandler>
  );
}

export default React.memo(Calendar);

/*
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
  */

/*
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
*/

/*
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
    */

/*
  const startXRef = useRef(-width);
  const translateX = useRef(new Animated.Value(startXRef.current)).current;

  const indexRef = useRef(0);
  */
