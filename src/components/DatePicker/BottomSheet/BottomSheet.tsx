import React from 'react';

import BottomSheetBase from '../../BottomSheet';
import { Body } from '../../../typography';

export interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  return (
    <BottomSheetBase
      customStyles={{
        container: {
          padding: 0,
        },
      }}
      visible={visible}
      onClose={onClose}
      height={380}
      closeOnDragDown={false}
    >
      {children}
    </BottomSheetBase>
  );
}

export default BottomSheet;
