export interface ActionSheetOptions {
    optionsIOS: string[];
    optionsAndroid: string[];
    title: string;
    tintColor?: string;
    destructiveButtonIndex?: number;
    message?: string;
    cancelButtonIndex?: number;
    onCancelAndroidIndex?: number;
}
declare const ActionSheet: ({ optionsIOS, optionsAndroid, title, tintColor, message, destructiveButtonIndex, cancelButtonIndex, onCancelAndroidIndex, }: ActionSheetOptions, callback: (index: number) => void) => void;
export default ActionSheet;
