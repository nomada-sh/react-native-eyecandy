import React from 'react';
export interface HeaderProps {
    locale?: string;
    month?: number;
    year?: number;
    debug?: boolean;
}
declare function Header({ debug, locale, month, year }: HeaderProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Header>;
export default _default;
