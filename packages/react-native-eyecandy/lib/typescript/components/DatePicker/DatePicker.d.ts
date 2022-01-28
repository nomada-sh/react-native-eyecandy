import React from 'react';
export interface DatePickerProps {
    date: Date;
    locale: string;
    onDateChange?: (date: Date) => void;
    disableCloseOnSelect?: boolean;
    doneText: string;
    backText: string;
    todayText: string;
}
declare function DatePicker({ date, onDateChange, locale, disableCloseOnSelect, doneText, backText, todayText, }: DatePickerProps): JSX.Element;
declare namespace DatePicker {
    var defaultProps: {
        date: Date;
        locale: string;
        doneText: string;
        backText: string;
        todayText: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof DatePicker>;
export default _default;
