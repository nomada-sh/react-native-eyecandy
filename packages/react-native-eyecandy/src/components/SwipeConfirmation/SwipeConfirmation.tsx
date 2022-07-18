import React from 'react';
import {
  Platform,
  StyleProp,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import { Body } from '../../typography';
import { BottomSheet, BottomSheetProps } from '../BottomSheet';
import SwipeButton from '../SwipeButton';

export interface SwipeConfirmationProps extends BottomSheetProps {
  title: string;
  swipeTitle?: string;
  onConfirm?: () => void;
  style?: StyleProp<ViewStyle>;
}

function SwipeConfirmation({
  title,
  swipeTitle,
  style,
  onConfirm,
  testID,
  ...props
}: SwipeConfirmationProps) {
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
        testID={testID ? `${testID}-title` : undefined}
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
        testID={testID ? `${testID}-swipe-button` : undefined}
        width={width - 40}
        onSuccess={onConfirm}
        title={swipeTitle}
      />
    </BottomSheet>
  );
}

SwipeConfirmation.defaultProps = {
  height: Platform.OS === 'ios' ? 190 : 150,
};

export default SwipeConfirmation;
