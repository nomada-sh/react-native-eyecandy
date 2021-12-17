import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  lang?: 'en' | 'es' | null | false;
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
  lang,
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

  const [index, setIndex] = useState(0);

  const handleGoToNextMonth = useCallback(() => {
    onGoToNextMonth();
  }, [onGoToNextMonth]);

  const handleGoToPrevMonth = useCallback(() => {
    onGoToPrevMonth();
  }, [onGoToPrevMonth]);

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
            useNativeDriver: false,
            duration: 300,
          }).start(() => {
            startXRef.current = -width;
            translateX.setValue(startXRef.current);

            direction < 0 ? handleGoToNextMonth() : handleGoToPrevMonth();

            //setIndex(prev => prev - direction);
          });
        } else {
          Animated.timing(translateX, {
            toValue: startXRef.current,
            useNativeDriver: false,
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
            onPressToday={onPressToday}
          />
          <Header lang={lang} month={month} year={year} />
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
    [lang, onDayPress, onPressMonth, onPressToday, onPressYear, selectedDate],
  );

  const months = useMemo(() => {
    return [
      renderMonth(year, month - 1, prev),
      renderMonth(year, month, current),
      renderMonth(year, month + 1, next),
    ];
  }, [current, next, prev, renderMonth, year, month]);

  /*
  useEffect(() => {
    console.log(index);
  }, [index]);
  */

  /*
  useEffect(() => {
    console.group('CALENDAR MOUNT');
    console.log('CALENDAR MOUNT', year, month);
    console.log('CALENDAR MOUNT', year, month + 1);
    console.log('CALENDAR MOUNT', year, month + 2);
    console.groupEnd();

    return () => {
      console.group('CALENDAR UNMOUNT');
      console.log('CALENDAR UNMOUNT', year, month);
      console.log('CALENDAR UNMOUNT', year, month + 1);
      console.log('CALENDAR UNMOUNT', year, month + 2);
      console.groupEnd();
    };
  }, [year, month]);
  */

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
