import React from 'react';
import type { CalendarDate } from 'calendar-base';
export interface DaysProps {
    data?: Array<false | CalendarDate>;
    onDayPress?: (value: CalendarDate) => void;
    selectedDate?: CalendarDate;
    year: number;
    month: number;
    debug?: boolean;
}
declare function Days({ debug, data, onDayPress, selectedDate, month, year, }: DaysProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Days>;
export default _default;
