/// <reference types="react" />
import { SharedValue } from 'react-native-reanimated';
import type { CalendarDate } from 'calendar-base';
export interface MonthProps {
    month: number;
    year: number;
    getCalendar: (year: number, month: number) => (false | CalendarDate)[];
    locale?: string;
    selectedDate: Date;
    width: number;
    index: number;
    onPressDay: (value: CalendarDate) => void;
    onPressYear: () => void;
    onPressMonth: () => void;
    onPressToday: () => void;
    x: SharedValue<number>;
    size: number;
    todayText?: string;
}
declare function Month({ month, year, getCalendar, locale, selectedDate: selectedDateProp, width, index, onPressDay, onPressYear, onPressMonth, onPressToday, x, size, todayText, }: MonthProps): JSX.Element;
export default Month;
