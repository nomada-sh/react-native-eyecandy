import React, { useCallback, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useUpdateEffect } from 'react-use';

import Content from './Content';

export interface BottomSheetProps {
  children?: React.ReactNode;
  visible?: boolean;
  height: number;
  handleHeight?: number;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  testID?: string;
  disableAnimations?: boolean;
}

function BottomSheet({
  children,
  visible = false,
  height,
  handleHeight = 40,
  onClose,
  contentStyle,
  handleStyle,
  testID,
  disableAnimations,
}: BottomSheetProps) {
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(
    visible,
  );

  const setModalInvisible = useCallback(() => {
    setModalVisible(false);
  }, []);

  useUpdateEffect(() => {
    if (visible) setModalVisible(visible);
  }, [visible]);

  return (
    <Modal
      testID={testID ? `${testID}-modal` : undefined}
      animationType={disableAnimations ? 'none' : 'fade'}
      visible={modalVisible}
      statusBarTranslucent
      transparent
      onRequestClose={onClose}
    >
      <View
        testID={testID ? `${testID}-container` : undefined}
        style={styles.container}
      >
        <TouchableWithoutFeedback
          testID={testID ? `${testID}-mask` : undefined}
          onPress={onClose}
        >
          <View style={styles.mask} />
        </TouchableWithoutFeedback>
        <View
          style={{
            height: height + handleHeight,
          }}
        >
          <Content
            disableAnimations={disableAnimations}
            testID={testID}
            style={contentStyle}
            handleStyle={handleStyle}
            handleHeight={handleHeight}
            height={height}
            visible={visible}
            onDismiss={onClose}
            onClose={setModalInvisible}
          >
            {children}
          </Content>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mask: {
    flex: 1,
  },
});

export default BottomSheet;
