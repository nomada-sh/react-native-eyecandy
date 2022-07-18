import React, { useCallback, useState } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';

import Content from './Content';

function ContentWrapper({
  children,
  visible = false,
  handleHeight = 40,
  height,
  onClose,
  contentStyle,
  handleStyle,
  testID,
  disableAnimations,
  setModalInvisible,
  dragOutEnabled,
}: {
  children?: React.ReactNode;
  visible?: boolean;
  height: number;
  handleHeight?: number;
  onClose?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  handleStyle?: StyleProp<ViewStyle>;
  testID?: string;
  disableAnimations?: boolean;
  setModalInvisible: () => void;
  dragOutEnabled?: boolean;
}) {
  return (
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
          dragOutEnabled={dragOutEnabled}
        >
          {children}
        </Content>
      </View>
    </View>
  );
}

const ContentWrapperWithHoc = gestureHandlerRootHOC(ContentWrapper);

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
  dragOutEnabled?: boolean;
}

export function BottomSheet({
  children,
  visible = false,
  height,
  handleHeight = 40,
  onClose,
  contentStyle,
  handleStyle,
  testID,
  disableAnimations,
  dragOutEnabled,
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
      <ContentWrapperWithHoc
        visible={visible}
        height={height}
        handleHeight={handleHeight}
        onClose={onClose}
        contentStyle={contentStyle}
        handleStyle={handleStyle}
        testID={testID}
        disableAnimations={disableAnimations}
        setModalInvisible={setModalInvisible}
        dragOutEnabled={dragOutEnabled}
      >
        {children}
      </ContentWrapperWithHoc>
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
