import React from 'react';
import { ScrollView } from 'react-native';

import { NPS } from '@nomada-sh/react-native-eyecandy';

export function RatingScreen() {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState('');

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <NPS
        rating={rating}
        onRatingChange={setRating}
        review={review}
        onReviewChange={setReview}
      />
    </ScrollView>
  );
}
