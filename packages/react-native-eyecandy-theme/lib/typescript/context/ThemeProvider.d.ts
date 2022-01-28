import React, { ReactNode } from 'react';
import { DefaultTheme } from '../themes';
export declare const ThemeContext: React.Context<import("../themes").Theme>;
export interface EyeCandyProps {
    theme?: typeof DefaultTheme;
    children?: ReactNode;
}
export default function ThemeProvider({ theme, ...props }: EyeCandyProps): JSX.Element;
