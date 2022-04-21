import React from 'react';
import { ScrollView, View } from 'react-native';

import {
  Body,
  Button,
  IconButton,
  LinkButton,
  RadioButton,
} from '@nomada-sh/react-native-eyecandy';
import { Crown } from '@nomada-sh/react-native-eyecandy-icons';

export default function Buttons() {
  const [value, setValue] = React.useState<boolean>(true);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
      }}
    >
      <Button marginBottom={20}>Button</Button>
      <Button marginBottom={20} color="primary">
        Button Primary
      </Button>
      <Button marginBottom={20} color="secondary">
        Button Secondary
      </Button>
      <Button variant="rounded" marginBottom={20} inverse>
        Button Rounded Inverse
      </Button>
      <LinkButton icon={Crown} marginBottom={20}>
        Link Button
      </LinkButton>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <IconButton icon={<Body>Text</Body>} />
        <IconButton icon={Crown} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <RadioButton value={value} onValueChange={setValue} />
        <RadioButton
          value={!value}
          onValueChange={() => setValue(!value)}
          size={64}
        />
      </View>
    </ScrollView>
  );
}
