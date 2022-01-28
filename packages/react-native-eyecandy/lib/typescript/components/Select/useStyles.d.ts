import { ThemeInputColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
export default function useStyles<ValueType>({ color, variant, value, focused, withPaddingStart, }: {
    color?: ThemeInputColorChoices;
    value?: ValueType;
    focused?: boolean;
    withPaddingStart?: boolean;
    variant?: 'default' | 'outlined';
}): {
    container: {
        borderRadius: number;
        borderWidth: number;
        borderStyle: "solid";
        overflow: "hidden";
        flexDirection: "row";
        borderColor: string;
        backgroundColor: string | undefined;
    };
    selectContainer: {
        flex: number;
    };
    input: {
        color: string;
        fontWeight: "normal" | "700";
        paddingHorizontal: number;
        paddingStart: number;
        height: number;
    };
    placeholder: {
        color: string;
    };
    iconContainer: {
        justifyContent: "center";
        paddingHorizontal: number;
    };
    icon: {
        fontSize: number;
        color: string | undefined;
    };
};
