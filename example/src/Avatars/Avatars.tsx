import React from 'react';
import { ScrollView } from 'react-native';

import { Avatar } from '@nomada-sh/react-native-eyecandy';

export default function Avatars() {
  return (
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
    </ScrollView>
  );
}
