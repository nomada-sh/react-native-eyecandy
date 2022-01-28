import React from 'react';
import { View } from 'react-native';
export interface CellProps {
    index: number;
    value: string;
    size?: number;
    ref?: React.RefObject<View>;
    focused?: boolean;
    onPress?: (index: number) => void;
}
declare const Cell: React.ForwardRefExoticComponent<Pick<CellProps, "value" | "onPress" | "size" | "focused" | "index"> & React.RefAttributes<View>>;
export default Cell;
