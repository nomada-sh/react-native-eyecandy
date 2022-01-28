import React from 'react';
import { BottomSheetProps } from '../BottomSheet';
export interface BottomSheetSwipeConfirmationProps extends BottomSheetProps {
    title: string;
    swipeTitle?: string;
    onConfirm?: () => void;
}
declare function BottomSheetSwipeConfirmation({ title, swipeTitle, style, onConfirm, ...props }: BottomSheetSwipeConfirmationProps): JSX.Element;
declare namespace BottomSheetSwipeConfirmation {
    var defaultProps: {
        height: number;
        closeOnPressMask: boolean;
        visible?: boolean | undefined;
        children?: React.ReactNode;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        onOpen?: (() => void) | undefined;
        onClose?: (() => void) | undefined;
        animationType?: "none" | "fade" | "slide" | undefined;
        minClosingHeight?: number | undefined;
        openDuration?: number | undefined;
        closeDuration?: number | undefined;
        closeOnDragDown?: boolean | undefined;
        dragFromTopOnly?: boolean | undefined;
        closeOnPressBack?: boolean | undefined;
        keyboardAvoidingViewEnabled?: boolean | undefined;
        customStyles?: {
            wrapper?: import("react-native").StyleProp<import("react-native").ViewStyle>;
            container?: import("react-native").StyleProp<import("react-native").ViewStyle>;
            draggableIcon?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        } | undefined;
        grantThreshold?: number | undefined;
        ref?: React.Ref<import("../BottomSheet").BottomSheetHandle> | undefined;
        key?: React.Key | null | undefined;
    };
}
export default BottomSheetSwipeConfirmation;
