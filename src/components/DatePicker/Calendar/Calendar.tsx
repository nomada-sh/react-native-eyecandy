import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import type { CalendarDate } from 'calendar-base';

import { Body } from '../../../typography';

import Days from './Days';
import Header from './Header';

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
  onGoToNextMonth?: () => void;
  onGoToPrevMonth?: () => void;
}

function Calendar({
  lang,
  year,
  month,
  style,
  selectedDate,
  onDayPress,
  getCalendar,
  debug,
  onGoToNextMonth,
  onGoToPrevMonth,
}: CalendarProps) {
  const count = useRef(1);

  const prev = useMemo(() => {
    return getCalendar(year, month - 1);
  }, [month, year, getCalendar]);

  const next = useMemo(() => {
    return getCalendar(year, month + 1);
  }, [month, year, getCalendar]);

  const current = useMemo(() => {
    debug &&
      console.log(
        'CALENDAR CREATING DAYS',
        `${month}/${year},`,
        'CREATION COUNT:',
        count.current++,
      );
    return getCalendar(year, month);
  }, [debug, month, year, getCalendar]);

  const width = useRef(Dimensions.get('window').width).current;
  const startXRef = useRef(-width);
  const translateX = useRef(new Animated.Value(startXRef.current)).current;

  const [index, setIndex] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderMove: (_, gestureState) => {
        const start = width / 2;
        const end = start + gestureState.dx;
        const direction = end > start ? 1 : -1;
        const distance = Math.abs(end - start);

        translateX.setValue(startXRef.current + direction * distance);
      },
      onPanResponderRelease: (_, gestureState) => {
        const start = width / 2;
        const end = start + gestureState.dx;
        const direction = end > start ? 1 : -1;
        const distance = Math.abs(end - start);

        const threshold = width / 4;

        if (distance > threshold) {
          startXRef.current += width * direction;

          Animated.timing(translateX, {
            toValue: startXRef.current,
            useNativeDriver: false,
            duration: 300,
          }).start(() => {
            direction < 0
              ? onGoToNextMonth && onGoToNextMonth()
              : onGoToPrevMonth && onGoToPrevMonth();

            setIndex(prev => prev - direction);

            startXRef.current = -width;
            translateX.setValue(startXRef.current);
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
      return (
        <View key={`${year}-${month}`}>
          <View>
            <Body>
              {year}/{month}
            </Body>
          </View>
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
    [lang, onDayPress, selectedDate],
  );

  const months = useMemo(() => {
    return [
      renderMonth(year, month - 1, prev),
      renderMonth(year, month, current),
      renderMonth(year, month + 1, next),
    ];
  }, [current, month, next, prev, renderMonth, year]);

  useEffect(() => {
    console.log(index);
  }, [index]);

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
