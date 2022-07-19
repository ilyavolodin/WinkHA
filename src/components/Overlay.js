import React from 'react';
import {StyleSheet, TouchableHighlight, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {globalStyles, tokens} from '../styles';

export const Overlay = ({visible, changeVisibility, children}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        changeVisibility(!visible);
      }}>
      <View style={[globalStyles.fullSize, styles.modalBackground]}>
        <View
          style={[
            globalStyles.borderRounded,
            globalStyles.fullSize,
            styles.modal,
          ]}>
          <TouchableHighlight
            styles={styles.backButtonTouch}
            onPress={() => changeVisibility(!visible)}>
            <Icon
              name="chevron-left"
              style={[globalStyles.iconLarge, styles.backButton]}
            />
          </TouchableHighlight>
          <View>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    padding: 30,
    backgroundColor: `rgba(${tokens.colors.black}, .5)`,
  },
  modal: {
    padding: 15,
    backgroundColor: `rgb(${tokens.colors.white})`,
  },
  backButton: {
    marginLeft: -15,
    marginTop: -15,
  },
});
