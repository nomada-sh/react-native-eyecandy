import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
export interface CalendarProps {
    width: number;
    date: Date;
    locale?: string;
    style?: StyleProp<ViewStyle>;
    debug?: boolean;
    onGoToYears: () => void;
    onGoToMonths: () => void;
    onDateChange?: (date: Date) => void;
    yearMonthSelectionStep?: 'year' | 'month';
    setYearMonthSelectionStep?: (step: 'year' | 'month' | undefined) => void;
    todayText?: string;
}
declare function Calendar({ locale, date, onDateChange, width, onGoToYears, onGoToMonths, yearMonthSelectionStep, setYearMonthSelectionStep, todayText, }: CalendarProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Calendar>;
export default _default;
