import React from 'react';

import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';

export interface BottomSheetProps extends RBSheetProps {
  ref?: React.Ref<RBSheet>;
  children?: React.ReactNode;
}

const BottomSheet = React.forwardRef<RBSheet, BottomSheetProps>(
  ({ children, ...props }, ref?) => {
    return (
      <RBSheet {...props} ref={ref}>
        {children}
      </RBSheet>
    );
  },
);

export type BottomSheetHandle = React.ElementRef<typeof BottomSheet>;

export default BottomSheet;
