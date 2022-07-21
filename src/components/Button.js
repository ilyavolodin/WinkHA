import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {globalStyles} from '../styles';

export const Button = ({children, onPress, style}) => {
  let buttonStyles = [
    globalStyles.grayBackground,
    globalStyles.borderRounded,
    globalStyles.centeredContent,
    styles.button,
  ];
  if (style && Array.isArray(buttonStyles)) {
    buttonStyles = buttonStyles.concat(style);
  } else if (style) {
    buttonStyles.push(style);
  }
  return (
    <TouchableHighlight onPress={onPress} style={buttonStyles}>
      {children}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});
