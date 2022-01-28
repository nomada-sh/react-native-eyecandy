import React from 'react';
export interface ContentProps {
    children?: React.ReactNode;
    height: number;
    visible?: boolean;
    onDismiss?: () => void;
    onClose?: () => void;
    onOpen?: () => void;
}
export interface BottomSheetProps {
    children?: React.ReactNode;
    visible?: boolean;
    height: number;
    onClose?: () => void;
}
declare function BottomSheet({ children, visible, height: initialHeight, onClose, }: BottomSheetProps): JSX.Element;
export default BottomSheet;
