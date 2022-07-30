import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {globalStyles, tokens} from '../styles';

export const Button = ({children, onPress, style, type = 'normal'}) => {
  let buttonStyles = [
    globalStyles.grayBackground,
    globalStyles.borderRounded,
    globalStyles.centeredContent,
    styles.button,
    type === 'small' ? styles.small : styles.normal,
  ];
  if (style && Array.isArray(buttonStyles)) {
    buttonStyles = buttonStyles.concat(style);
  } else if (style) {
    buttonStyles.push(style);
  }
  return (
    <TouchableHighlight
      onPress={onPress}
      style={buttonStyles}
      activeOpacity={0.9}
      underlayColor={tokens.colors.ha}>
      {children}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 2,
  },
  normal: {
    paddingHorizontal: 5,
  },
  small: {
    paddingHorizontal: 1,
    marginHorizontal: -5,
  },
});
