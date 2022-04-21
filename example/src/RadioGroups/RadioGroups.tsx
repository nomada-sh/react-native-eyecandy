import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import { RadioGroup, RadioGroupItem } from '@nomada-sh/react-native-eyecandy';

export default function RadioGroups() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <ScrollView>
      <RadioGroup
        style={{
          padding: 20,
        }}
        title="RadioGroup"
        value={value}
        onChange={setValue}
      >
        <RadioGroupItem value="option1" label="Option 1" />
        <RadioGroupItem value="option2" label="Option 2" />
        <RadioGroupItem value="option3" label="Option 3" />
        <RadioGroupItem value="option4" label="Option 4" />
        <RadioGroupItem value="option5" label="Option 5" />
        <RadioGroupItem
          value="option6"
          label="Option 6"
          onPress={console.log}
        />
        <View />
      </RadioGroup>
    </ScrollView>
  );
}