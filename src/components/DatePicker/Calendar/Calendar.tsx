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
  useAnimatedReaction,
  useAnimatedStyle,
  useCode,
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
  const x = useSharedValue(-width);

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
    },
    onActive: (e, ctx) => {
      x.value = ctx.startX + e.translationX;
    },
    onEnd: (e, ctx) => {
      const threshold = width / 3;
      const direction = e.translationX > 0 ? 1 : -1;

      if (Math.abs(e.translationX) >= threshold) {
        const newX = ctx.startX + width * direction;
        x.value = withTiming(newX, { duration: 300 }, () => {
          /*
          direction < 0
            ? runOnJS(onGoToNextMonth)()
            : runOnJS(onGoToPrevMonth)();
            */
        });

        /*
        offset.value -= direction;

        if (index.value === 0 && direction > 0) return;
        if (index.value === months.length - 1 && direction < 0) return;

        index.value -= direction;
        */
      } else {
        x.value = withTiming(ctx.startX, { duration: 300 });
      }
    },
  });

  const renderMonth = useCallback(
    (year: number, month: number, data: (CalendarDate | false)[]) => {
      const date = new Date(year, month);

      return (
        <View
          style={{
            width,
            backgroundColor: month % 2 === 0 ? 'red' : 'yellow',
          }}
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

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
        }}
      >
        <Animated.View
          style={[
            {
              flexDirection: 'row',
            },
            animatedStyle,
            style,
          ]}
        >
          {months}
        </Animated.View>
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
