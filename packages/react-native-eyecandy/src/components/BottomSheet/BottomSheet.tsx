import React, {useEffect, useImperativeHandle, useRef} from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';

import RBSheet, {RBSheetProps} from './RBSheet';

import {useTheme} from '@nomada-sh/react-native-eyecandy-theme';

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

const DARK_MASK_COLOR = 'rgba(0, 0, 0, 0.75)',
  LIGHT_MASK_COLOR = 'rgba(0, 0, 0, 0.5)';

const BottomSheet = React.forwardRef<BottomSheetHandle, BottomSheetProps>(
  ({style, visible, customStyles, ...props}, forwardedRef?) => {
    // TODO: Create BottomSheet colors.
    const {dark, background, divider} = useTheme(t => ({
      dark: t.dark,
      background: t.colors.background.default,
      divider: t.colors.divider.default,
    }));

    const ref = useRef<RBSheet>(null);

    useImperativeHandle(forwardedRef, () => ({
      open: () => ref.current?.open(),
      close: () => ref.current?.close(),
    }));

    useEffect(() => {
      if (visible) {
        ref.current?.open();
      } else {
        ref.current?.close();
      }
    }, [visible]);

    return (
      <RBSheet
        customStyles={{
          wrapper: [
            {
              backgroundColor: dark ? DARK_MASK_COLOR : LIGHT_MASK_COLOR,
            },
            customStyles.wrapper,
          ],
          container: [
            {
              backgroundColor: background.container,
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
              backgroundColor: divider,
              width: 64,
              marginBottom: 20,
            },
            customStyles.draggableIcon,
          ],
        }}
        {...props}
        ref={ref}
      />
    );
  },
);

BottomSheet.defaultProps = {
  closeOnDragDown: true,
  animationType: 'none',
  height: 260,
  minClosingHeight: 0,
  openDuration: 300,
  closeDuration: 200,
  dragFromTopOnly: false,
  closeOnPressMask: true,
  closeOnPressBack: true,
  keyboardAvoidingViewEnabled: Platform.OS === 'ios',
  customStyles: {},
  onClose: () => {},
  onOpen: () => {},
};

export default BottomSheet;
