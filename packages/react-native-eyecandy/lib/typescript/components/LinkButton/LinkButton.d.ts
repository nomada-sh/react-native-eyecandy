import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BaseButtonProps } from '../BaseButton';
export interface LinkButtonProps extends BaseButtonProps {
    icon?: FC<{
        size?: number;
        stroke?: string;
        style?: StyleProp<ViewStyle>;
    }>;
    text: string;
    showChevron?: boolean;
    bold?: boolean;
    focused?: boolean;
}
declare function LinkButton({ text, icon, buttonStyle, color, showChevron, bold, focused, ...props }: LinkButtonProps): JSX.Element;
export default LinkButton;
