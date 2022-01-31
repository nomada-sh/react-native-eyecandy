import React from 'react';

import BottomSheet, {BottomSheetProps} from '../BottomSheet';
import SwipeButton from '../SwipeButton';
import {Body} from '../../typography';

export interface BottomSheetSwipeConfirmationProps extends BottomSheetProps {
  title: string;
  swipeTitle?: string;
  onConfirm?: () => void;
}

function BottomSheetSwipeConfirmation({
  title,
  swipeTitle,
  style,
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
      {...props}>
      <Body
        color="greyout"
        align="center"
        weight="medium"
        style={{
          marginBottom: 16,
        }}>
        {title}
      </Body>
      <SwipeButton onSwipeSuccess={onConfirm} title={swipeTitle} />
    </BottomSheet>
  );
}

BottomSheetSwipeConfirmation.defaultProps = {
  ...BottomSheet.defaultProps,
  height: 170,
  closeOnPressMask: false,
};

export default BottomSheetSwipeConfirmation;
