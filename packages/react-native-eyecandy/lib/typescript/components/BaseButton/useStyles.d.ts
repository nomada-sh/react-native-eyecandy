import { ThemeButtonColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
export default function useStyles({ color, inverse, variant, height, disabled, fullwidth, }: {
    color?: ThemeButtonColorChoices;
    inverse?: boolean;
    variant?: 'default' | 'outlined' | 'rounded' | 'transparent-rounded';
    height?: number;
    disabled?: boolean | null;
    fullwidth?: boolean;
}): {
    container: {
        height: number;
        borderRadius: number;
        overflow: "hidden";
        width: string | undefined;
    };
    button: {
        flex: number;
        borderRadius: number;
        backgroundColor: string;
        justifyContent: "center";
        alignItems: "center";
    };
    ripple: {
        color: string;
    };
    disabled: {
        backgroundColor: string | undefined;
        position: "absolute";
        top: number;
        left: number;
        right: number;
        bottom: number;
    };
    loadingContainer: {
        position: "absolute";
        top: number;
        left: number;
        right: number;
        bottom: number;
        justifyContent: "center";
    };
    loading: {
        color: string;
    };
};
