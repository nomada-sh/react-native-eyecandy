import React from 'react';

import BottomSheet, { BottomSheetProps } from '../BottomSheet';
import SwipeButton from '../SwipeButton';
import { Body } from '../../typography';

export interface BottomSheetSwipeConfirmationProps
  extends Omit<BottomSheetProps, 'onClose'> {
  title: string;
  swipeTitle?: string;
  onConfirm?: () => void;
  onCancel?: BottomSheetProps['onClose'];
}

function BottomSheetSwipeConfirmation({
  title,
  swipeTitle,
  style,
  onCancel,
  onConfirm,
  ...props
}: BottomSheetSwipeConfirmationProps) {
  return (
    <BottomSheet
      style={[
        {
          alignItems: 'center',
        },
        style,
      ]}
      height={170}
      onClose={onCancel}
      closeOnPressMask={false}
      {...props}
    >
      <Body
        color="grey"
        align="center"
        weight="medium"
        style={{
          marginBottom: 16,
        }}
      >
        {title}
      </Body>
      <SwipeButton onSwipeSuccess={onConfirm} title={swipeTitle} />
    </BottomSheet>
  );
}

export default BottomSheetSwipeConfirmation;
