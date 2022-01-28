/// <reference types="react" />
export interface ActionsProps {
    date: Date;
    onPressYear: () => void;
    onPressMonth: () => void;
    onPressToday: () => void;
    locale: string;
    todayText: string;
}
declare function Actions({ date, onPressYear, onPressMonth, onPressToday, locale, // = 'en-US',
todayText, }: ActionsProps): JSX.Element;
declare namespace Actions {
    var defaultProps: {
        locale: string;
        todayText: string;
    };
}
export default Actions;
