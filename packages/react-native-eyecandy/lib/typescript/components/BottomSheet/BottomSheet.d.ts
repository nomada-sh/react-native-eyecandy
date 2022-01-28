import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import RBSheet, { RBSheetProps } from './RBSheet';
export interface BottomSheetProps extends RBSheetProps {
    ref?: React.Ref<RBSheet>;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    visible?: boolean;
}
export declare type BottomSheetHandle = {
    open: () => void;
    close: () => void;
};
declare const BottomSheet: React.ForwardRefExoticComponent<Pick<BottomSheetProps, "visible" | "height" | "children" | "style" | "onOpen" | "onClose" | "animationType" | "minClosingHeight" | "openDuration" | "closeDuration" | "closeOnDragDown" | "dragFromTopOnly" | "closeOnPressMask" | "closeOnPressBack" | "keyboardAvoidingViewEnabled" | "customStyles" | "grantThreshold"> & React.RefAttributes<BottomSheetHandle>>;
export default BottomSheet;
