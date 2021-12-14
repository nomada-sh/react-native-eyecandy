import React, { useEffect, useImperativeHandle } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';

import { useTheme } from '../../hooks';

export interface BottomSheetProps extends RBSheetProps {
  ref?: React.Ref<RBSheet>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
}

export type BottomSheetHandle = {
  open: () => void;
  close: () => void;
};

const BottomSheet = React.forwardRef<BottomSheetHandle, BottomSheetProps>(
  ({ children, customStyles = {}, style, visible, ...props }, ref?) => {
    const { palette } = useTheme();

    const bottomSheetRef = React.useRef<RBSheet>(null);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.open(),
      close: () => bottomSheetRef.current?.close(),
    }));

    useEffect(() => {
      if (visible) bottomSheetRef.current?.open();
      else bottomSheetRef.current?.close();
    }, [visible]);

    return (
      <RBSheet
        customStyles={{
          container: [
            {
              backgroundColor: palette.background.container,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: 20,
              paddingTop: 0,
            },
            customStyles.container,
            style,
          ],
          draggableIcon: [
            {
              backgroundColor: palette.divider,
              width: 64,
              marginBottom: 20,
            },
            customStyles.draggableIcon,
          ],
        }}
        closeOnDragDown
        {...props}
        ref={bottomSheetRef}
      >
        {children}
      </RBSheet>
    );
  },
);

export default BottomSheet;
