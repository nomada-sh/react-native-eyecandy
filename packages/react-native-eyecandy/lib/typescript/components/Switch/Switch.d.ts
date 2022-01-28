import { ReactNode } from 'react';
import { SwitchProps as SwitchBaseProps } from 'react-native';
import { ThemeSwitchColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
export interface SwitchProps extends SwitchBaseProps {
    children?: ReactNode;
    color?: ThemeSwitchColorChoices;
}
declare function Switch({ color, ...props }: SwitchProps): JSX.Element;
export default Switch;
