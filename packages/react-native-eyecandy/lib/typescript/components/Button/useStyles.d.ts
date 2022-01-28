import { ThemeButtonColorChoices } from '@nomada-sh/react-native-eyecandy-theme';
export default function useStyles({ color, inverse, }: {
    color?: ThemeButtonColorChoices;
    inverse?: boolean;
}): {
    text: {
        color: string;
    };
};
