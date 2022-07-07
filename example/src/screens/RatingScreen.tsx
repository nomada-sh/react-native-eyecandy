import React from 'react';
import { ScrollView } from 'react-native';

import { Body, Button, NPS } from '@nomada-sh/react-native-eyecandy';

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
      <Button onPress={() => setRating(3)}>Set 3</Button>
      <NPS
        rating={rating}
        onRatingChange={setRating}
        review={review}
        onReviewChange={setReview}
      />
      <Body>{rating}</Body>
      <Body>{review}</Body>
    </ScrollView>
  );
}
