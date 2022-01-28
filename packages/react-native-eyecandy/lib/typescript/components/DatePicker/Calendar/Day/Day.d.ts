import React from 'react';
import type { CalendarDate } from 'calendar-base';
export interface DayProps {
    value: CalendarDate | false;
    onPress?: (value: CalendarDate) => void;
    selected?: boolean;
    debug?: boolean;
}
declare function Day({ value, onPress, selected, debug }: DayProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Day>;
export default _default;
