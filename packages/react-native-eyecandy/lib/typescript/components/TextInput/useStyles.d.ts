/// <reference types="react" />
import type { TextInputIcon, TextInputProps } from './typings';
export default function useStyles({ color, focused, widthPaddingEnd, widthPaddingStart, value, dirty, hasError, fullWidth, }: {
    color?: TextInputProps['color'];
    focused: boolean;
    widthPaddingEnd: boolean;
    widthPaddingStart: boolean;
    value?: string;
    dirty?: boolean;
    hasError?: boolean;
    fullWidth?: boolean;
}): {
    styles: {
        container: {
            width: string | undefined;
        };
        inputContainer: {
            height: number;
            borderWidth: number;
            backgroundColor: string;
            borderRadius: number;
            overflow: "hidden";
            flexDirection: "row";
            borderStyle: "solid";
            borderColor: string;
        };
        iconContainer: {
            justifyContent: "center";
            paddingHorizontal: number;
        };
        icon: {
            fontSize: number;
            color: string;
        };
        input: {
            flex: number;
            color: string;
            fontSize: number;
            fontWeight: "normal" | "700";
            paddingEnd: number;
            paddingStart: number;
        };
        inputPlaceholder: {
            color: string;
        };
    };
    keyboardAppearance: "dark" | "light";
    renderIcon: (Icon: TextInputIcon, stroke?: string | undefined) => JSX.Element;
};
