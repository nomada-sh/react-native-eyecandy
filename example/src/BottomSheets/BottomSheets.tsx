import React from 'react';
import { ScrollView } from 'react-native';

import {
  Body,
  BottomSheet,
  BottomSheetSwipeConfirmation,
  Button,
  TextInputV2,
} from '@nomada-sh/react-native-eyecandy';

export default function BottomSheets() {
  const [visible, setVisible] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [height, setHeight] = React.useState(200);

  return (
    <ScrollView>
      <TextInputV2
        defaultValue={`${height}`}
        onChangeText={text => {
          if (text !== '' && !Number.isNaN(Number(text)))
            setHeight(Number(text));
        }}
      />
      <Button onPress={() => setVisible(true)} text="Show Bottom Sheet" />
      <Body>{`${visible}`}</Body>
      <Button
        onPress={() => setVisible2(true)}
        text="Show Bottom Sheet Swipe Confirmation"
      />
      <BottomSheet
        visible={visible}
        height={height}
        onClose={() => setVisible(false)}
      />
      <BottomSheetSwipeConfirmation
        title="Are you sure you want to delete this item?"
        visible={visible2}
        onClose={() => setVisible2(false)}
        onConfirm={() => setVisible2(false)}
      />
    </ScrollView>
  );
}
