import React from 'react';

import BottomSheet, { BottomSheetProps } from '../BottomSheetV2';
import SwipeButton from '../SwipeButton';
import { Body } from '../../typography';
import { StyleProp, ViewStyle } from 'react-native';

export interface BottomSheetSwipeConfirmationProps extends BottomSheetProps {
  title: string;
  swipeTitle?: string;
  onConfirm?: () => void;
  style?: StyleProp<ViewStyle>;
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
      contentStyle={[
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
  height: 170,
};

export default BottomSheetSwipeConfirmation;
