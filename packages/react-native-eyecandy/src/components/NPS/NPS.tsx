import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Rating, RatingProps } from '../Rating';
import { TextArea } from '../TextArea';
import { TextInputProps } from '../TextInput';

export interface NPSProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  review: string;
  onReviewChange: (review: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  ratingProps?: Omit<RatingProps, 'onChange' | 'value'>;
  reviewProps?: Omit<TextInputProps, 'onChangeText' | 'value'>;
}

export function NPS({
  rating,
  onRatingChange,
  review,
  onReviewChange,
  placeholder = 'Type your review...',
  ratingProps: ratingPropsProp = {},
  reviewProps: reviewPropsProp = {},
  ...props
}: NPSProps) {
  const ratingProps: RatingProps = {
    ...ratingPropsProp,
    onChange: onRatingChange,
    value: rating,
    style: [
      {
        justifyContent: 'center',
        marginBottom: 20,
      },
      ratingPropsProp.style,
    ],
  };

  const reviewProps: TextInputProps = {
    placeholder,
    ...reviewPropsProp,
    onChangeText: onReviewChange,
    value: review,
  };

  return (
    <View {...props}>
      <Rating {...ratingProps} />
      <TextArea {...reviewProps} />
    </View>
  );
}
