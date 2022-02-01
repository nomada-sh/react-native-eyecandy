import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleProp,
  ViewStyle,
  ModalProps,
  PanResponderInstance,
  StyleSheet,
  Platform,
} from 'react-native';

const SUPPORTED_ORIENTATIONS: ModalProps['supportedOrientations'] = [
  'portrait',
  'portrait-upside-down',
  'landscape',
  'landscape-left',
  'landscape-right',
];

export interface RBSheetProps {
  animationType: 'none' | 'fade' | 'slide';
  height: number;
  minClosingHeight: number;
  openDuration: number;
  closeDuration: number;
  closeOnDragDown: boolean;
  dragFromTopOnly: boolean;
  closeOnPressMask: boolean;
  closeOnPressBack: boolean;
  keyboardAvoidingViewEnabled: boolean;
  onClose: () => void;
  onOpen: () => void;
  customStyles: {
    wrapper?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    draggableIcon?: StyleProp<ViewStyle>;
  };
  children?: React.ReactNode;
  grantThreshold?: number;
}

export interface RBSheetState {
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  pan: Animated.ValueXY;
}

class RBSheet extends Component<RBSheetProps, RBSheetState> {
  static defaultProps: Omit<RBSheetProps, 'children'> = {
    animationType: 'none',
    height: 260,
    minClosingHeight: 0,
    openDuration: 300,
    closeDuration: 200,
    closeOnDragDown: false,
    dragFromTopOnly: false,
    closeOnPressMask: true,
    closeOnPressBack: true,
    keyboardAvoidingViewEnabled: Platform.OS === 'ios',
    customStyles: {},
    onClose: () => {},
    onOpen: () => {},
  };

  panResponder: PanResponderInstance;

  constructor(props: RBSheetProps) {
    super(props);

    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };

    this.panResponder = PanResponder.create({});

    this.createPanResponder(props);
  }

  setModalVisible(visible: boolean) {
    const {
      height,
      minClosingHeight,
      openDuration,
      closeDuration,
      onClose,
      onOpen,
    } = this.props;

    const { animatedHeight, pan } = this.state;

    if (visible) {
      this.setState({ modalVisible: visible });

      onOpen?.();

      // Animated.timing(animatedHeight, {
      //   useNativeDriver: false,
      //   toValue: height,
      //   duration: openDuration,
      // }).start();
      Animated.spring(animatedHeight, {
        toValue: height,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        useNativeDriver: false,
        toValue: minClosingHeight,
        duration: closeDuration,
      }).start(() => {
        pan.setValue({ x: 0, y: 0 });
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });

        onClose?.();
      });
    }
  }

  createPanResponder(props: RBSheetProps) {
    const { closeOnDragDown = false, height, onClose } = props;
    const { pan } = this.state;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => closeOnDragDown,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
            e,
            gestureState,
          );
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (height / 4 - gestureState.dy < 0) {
          onClose?.();
        }

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    });
  }

  open() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  render() {
    const {
      animationType,
      closeOnDragDown,
      dragFromTopOnly,
      closeOnPressMask,
      closeOnPressBack,
      children,
      customStyles = {},
      keyboardAvoidingViewEnabled,
      onClose,
    } = this.props;

    const { animatedHeight, pan, modalVisible } = this.state;

    const panStyle = {
      transform: pan.getTranslateTransform(),
    };

    return (
      <Modal
        transparent
        animationType={animationType}
        visible={modalVisible}
        supportedOrientations={SUPPORTED_ORIENTATIONS}
        onRequestClose={() => {
          if (closeOnPressBack) {
            onClose?.();
          }
        }}>
        <KeyboardAvoidingView
          enabled={keyboardAvoidingViewEnabled}
          behavior="padding"
          style={[styles.wrapper, customStyles.wrapper]}>
          <TouchableOpacity
            style={styles.mask}
            activeOpacity={1}
            onPress={() => (closeOnPressMask ? this.close() : null)}
          />
          <Animated.View
            {...(!dragFromTopOnly && this.panResponder.panHandlers)}
            style={[
              panStyle,
              styles.container,
              { height: animatedHeight },
              customStyles.container,
            ]}>
            {closeOnDragDown && (
              <View
                {...(dragFromTopOnly && this.panResponder.panHandlers)}
                style={styles.draggableContainer}>
                <View
                  style={[styles.draggableIcon, customStyles.draggableIcon]}
                />
              </View>
            )}
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#00000077',
  },
  mask: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 0,
    overflow: 'hidden',
  },
  draggableContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#ccc',
  },
});

export default RBSheet;
