import React from 'react';
import {StyleSheet, TouchableHighlight, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Overlay = ({visible, changeVisibility, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        changeVisibility(!visible);
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <TouchableHighlight
            styles={styles.backButtonTouch}
            onPress={() => changeVisibility(!visible)}>
            <Icon name="chevron-left" style={styles.backButton} />
          </TouchableHighlight>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    width: '100%',
    height: '100%',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    padding: 15,
    backgroundColor: 'white',
  },
  backButton: {
    fontSize: 50,
    marginLeft: -15,
    marginTop: -15,
  },
});
