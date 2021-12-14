import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { StyleProp, ViewStyle, LogBox } from 'react-native';

import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';
import BS from './BS';

import { useTheme } from '../../hooks';

LogBox.ignoreAllLogs(true);

export interface BottomSheetProps extends Omit<RBSheetProps, 'onClose'> {
  ref?: React.Ref<RBSheet>;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  onClose?: () => boolean;
}

export type BottomSheetHandle = {
  open: () => void;
  close: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetHandle, BottomSheetProps>(
  (
    { children, customStyles = {}, style, visible, onClose, onOpen, ...props },
    ref?,
  ) => {
    const { dark, palette } = useTheme();

    const bottomSheetRef = React.useRef<RBSheet>(null);
    const [open, setOpen] = React.useState(!!visible);

    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.open(),
      close: () => {
        bottomSheetRef.current?.close();
        return true;
      },
    }));

    useEffect(() => {
      if (visible) bottomSheetRef.current?.open();
      else bottomSheetRef.current?.close();
    }, [visible]);

    /*
    useEffect(() => {
      if (visible) setOpen(true);
      else setOpen(false);
    }, [visible]);

    useEffect(() => {
      console.log('open', open);
      if (open) bottomSheetRef.current?.open();
      else bottomSheetRef.current?.close();
    }, [open]);
    */

    return (
      <BS
        customStyles={{
          wrapper: [
            {
              backgroundColor: dark
                ? 'rgba(0, 0, 0, 0.75)'
                : 'rgba(0, 0, 0, 0.5)',
            },
            customStyles.wrapper,
          ],
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
        onOpen={() => {
          onOpen?.();
        }}
        onClose={() => {
          const shouldClose = onClose ? onClose() : true;
          //if (!shouldClose) bottomSheetRef.current?.open();
        }}
        {...props}
        ref={bottomSheetRef}
      >
        {children}
      </BS>
    );
  },
);

export default BottomSheet;
