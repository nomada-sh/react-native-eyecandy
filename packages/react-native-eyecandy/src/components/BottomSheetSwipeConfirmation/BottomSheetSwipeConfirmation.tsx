import React from 'react';

import BottomSheet, { BottomSheetProps } from '../BottomSheetV2';
import SwipeButton from '../SwipeButton';
import { Body } from '../../typography';
import { StyleProp, useWindowDimensions, ViewStyle } from 'react-native';

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
  const { width } = useWindowDimensions();

  return (
    <BottomSheet
      contentStyle={[
        {
          alignItems: 'center',
          paddingHorizontal: 20,
        },
        style,
      ]}
      {...props}>
      <Body
        color="greyout"
        align="center"
        weight="medium"
        style={{
          marginBottom: 20,
        }}>
        {title}
      </Body>
      <SwipeButton
        width={width - 40}
        onSuccess={onConfirm}
        title={swipeTitle}
      />
    </BottomSheet>
  );
}

BottomSheetSwipeConfirmation.defaultProps = {
  height: 150,
};

export default BottomSheetSwipeConfirmation;
