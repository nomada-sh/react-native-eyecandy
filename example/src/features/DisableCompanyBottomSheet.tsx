import React, { useState } from 'react';
import {
  Button,
  BottomSheetSwipeConfirmation,
} from '@nomada-sh/react-native-eyecandy';
import { Alert, View } from 'react-native';

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
      <BottomSheetSwipeConfirmation
        swipeTitle="Desliza para confirmar"
        title="¿Estás seguro de que quieres deshabilitar esta empresa?"
        onCancel={() => setVisible(false)}
        onConfirm={() => {
          Alert.alert('Empresa deshabilitada');
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
}
