import React from 'react';
import { ScrollView } from 'react-native';

import { Avatar } from '@nomada-sh/react-native-eyecandy';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Avatars() {
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
        <Avatar
          source={{
            uri: 'https://i.pravatar.cc/300',
          }}
        />
        <Avatar
          source={{
            uri: 'https://i.pravatar.cc/300',
          }}
          size={100}
        />
        <Avatar
          source={{
            uri: 'https://i.pravatar.cc/300',
          }}
          size={200}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
