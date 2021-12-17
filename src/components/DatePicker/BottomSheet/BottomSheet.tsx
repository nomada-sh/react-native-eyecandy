import React from 'react';

import BottomSheetBase from '../../BottomSheetV2';
import { Body } from '../../../typography';

export interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  return (
    <BottomSheetBase height={350} visible={visible} onClose={onClose}>
      {children}
    </BottomSheetBase>
  );
}

export default BottomSheet;
