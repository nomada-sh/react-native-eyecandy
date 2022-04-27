import React from 'react';
import { Alert, SafeAreaView, ScrollView } from 'react-native';

import {
  BottomSheetSwipeConfirmation,
  Button,
} from '@nomada-sh/react-native-eyecandy';

export default function () {
  const [visible, setVisible] = React.useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <Button
          onPress={() => setVisible(true)}
          text="Show swipe confirmation"
        />
        <BottomSheetSwipeConfirmation
          title="Swipe to confirm"
          visible={visible}
          onClose={() => setVisible(false)}
          onConfirm={() => {
            Alert.alert('Swipe confirmed');
            setVisible(false);
          }}
          swipeTitle="Swipe me"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
