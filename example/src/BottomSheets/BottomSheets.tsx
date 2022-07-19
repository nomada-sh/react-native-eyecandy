import React from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';

import {
  Body,
  BottomSheet,
  Button,
  IconButton,
} from '@nomada-sh/react-native-eyecandy';
import {
  Camera,
  Mail,
  Photo,
  Star,
} from '@nomada-sh/react-native-eyecandy-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function BottomSheets() {
  const [visible, setVisible] = React.useState(false);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
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
          <Button onPress={() => setVisible(true)}>Show Bottom Sheet</Button>
          <BottomSheet
            visible={visible}
            height={160}
            onClose={() => setVisible(false)}
            contentStyle={{
              padding: 20,
            }}
          >
            <Body marginBottom={20} weight="bold" align="center">
              Hello, I am a bottom sheet.
            </Body>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <IconButton icon={Camera} onPress={() => setVisible(false)} />
              <IconButton icon={Photo} onPress={() => setVisible(false)} />
              <IconButton icon={Star} onPress={() => setVisible(false)} />
              <IconButton icon={Mail} onPress={() => setVisible(false)} />
            </View>
          </BottomSheet>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
