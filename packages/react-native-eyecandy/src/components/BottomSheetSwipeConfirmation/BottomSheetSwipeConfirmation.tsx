import React from 'react';
import {
  Platform,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import { Body } from '../../typography';
import BottomSheet, { BottomSheetProps } from '../BottomSheetV2';
import SwipeButton from '../SwipeButton';

export interface BottomSheetSwipeConfirmationProps extends BottomSheetProps {
  title: string;
  swipeTitle?: string;
  onConfirm?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

function BottomSheetSwipeConfirmation({
  title,
  swipeTitle,
  style,
  onConfirm,
  testID,
  ...props
}: BottomSheetSwipeConfirmationProps) {
  const { width } = useWindowDimensions();

  return (
    <BottomSheet
      testID={testID}
      contentStyle={[
        {
          alignItems: 'center',
          paddingHorizontal: 20,
        },
        style,
      ]}
      {...props}
    >
      <Body
        testID={`${testID}-title`}
        color="greyout"
        align="center"
        weight="medium"
        style={{
          marginBottom: 20,
        }}
      >
        {title}
      </Body>
      <SwipeButton
        testID={`${testID}-swipe-button`}
        width={width - 40}
        onSuccess={onConfirm}
        title={swipeTitle}
      />
    </BottomSheet>
  );
}

BottomSheetSwipeConfirmation.defaultProps = {
  height: Platform.OS === 'ios' ? 190 : 150,
};

export default BottomSheetSwipeConfirmation;
