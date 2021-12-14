import React, { useState } from 'react';
import {
  BottomSheet,
  Button,
  SwipeButton,
  Body,
} from '@nomada-sh/react-native-eyecandy';
import { View } from 'react-native';

export default function DisableCompanyBottomSheet() {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button
        text="Disable Company"
        onPress={() => {
          setVisible(true);
        }}
      />
      <BottomSheet
        onClose={() => setVisible(false)}
        visible={visible}
        style={{
          alignItems: 'center',
        }}
        height={150}
      >
        <Body
          color="grey"
          align="center"
          weight="medium"
          style={{
            marginBottom: 16,
          }}
        >
          Confirma que quieres deshabilitar esta empresa.
        </Body>
        <SwipeButton title="Desliza para confirmar" />
      </BottomSheet>
    </View>
  );
}
