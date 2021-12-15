import React, { useState } from 'react';
import { Alert, View } from 'react-native';

import {
  Button,
  BottomSheetSwipeConfirmation,
} from '@nomada-sh/react-native-eyecandy';

export default function DisableCompanyBottomSheet() {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button
        text={`Disable Company ${visible}`}
        onPress={() => {
          setVisible(true);
        }}
      />
      <BottomSheetSwipeConfirmation
        swipeTitle="Desliza para confirmar"
        title="¿Estás seguro de que quieres deshabilitar esta empresa?"
        onClose={() => setVisible(false)}
        onConfirm={() => {
          Alert.alert('Empresa deshabilitada');
          setVisible(false);
        }}
        visible={visible}
      />
    </View>
  );
}
