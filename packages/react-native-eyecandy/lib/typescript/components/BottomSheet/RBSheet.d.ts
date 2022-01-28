import React, { Component } from 'react';
import { Animated, StyleProp, ViewStyle, PanResponderInstance } from 'react-native';
export interface RBSheetProps {
    animationType: 'none' | 'fade' | 'slide';
    height: number;
    minClosingHeight: number;
    openDuration: number;
    closeDuration: number;
    closeOnDragDown: boolean;
    dragFromTopOnly: boolean;
    closeOnPressMask: boolean;
    closeOnPressBack: boolean;
    keyboardAvoidingViewEnabled: boolean;
    onClose: () => void;
    onOpen: () => void;
    customStyles: {
        wrapper?: StyleProp<ViewStyle>;
        container?: StyleProp<ViewStyle>;
        draggableIcon?: StyleProp<ViewStyle>;
    };
    children?: React.ReactNode;
    grantThreshold?: number;
}
export interface RBSheetState {
    modalVisible: boolean;
    animatedHeight: Animated.Value;
    pan: Animated.ValueXY;
}
declare class RBSheet extends Component<RBSheetProps, RBSheetState> {
    static defaultProps: Omit<RBSheetProps, 'children'>;
    panResponder: PanResponderInstance;
    constructor(props: RBSheetProps);
    setModalVisible(visible: boolean): void;
    createPanResponder(props: RBSheetProps): void;
    open(): void;
    close(): void;
    render(): JSX.Element;
}
export default RBSheet;
