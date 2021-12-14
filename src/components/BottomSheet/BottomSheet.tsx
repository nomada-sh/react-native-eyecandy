import React from 'react';

import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';

import { useTheme } from '../../hooks';

export interface BottomSheetProps extends RBSheetProps {
  ref?: React.Ref<RBSheet>;
  children?: React.ReactNode;
}

const BottomSheet = React.forwardRef<RBSheet, BottomSheetProps>(
  ({ children, customStyles = {}, ...props }, ref?) => {
    const { palette } = useTheme();

    return (
      <RBSheet
        customStyles={{
          container: [
            {
              backgroundColor: palette.background.container,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
            customStyles.container,
          ],
          draggableIcon: [
            {
              backgroundColor: palette.divider,
              width: 64,
            },
            customStyles.draggableIcon,
          ],
        }}
        closeOnDragDown
        {...props}
        ref={ref}
      >
        {children}
      </RBSheet>
    );
  },
);
export type BottomSheetHandle = React.ElementRef<typeof BottomSheet>;

export default BottomSheet;
