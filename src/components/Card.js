import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {globalStyles} from '../styles';

export const Card = ({children, slots = 1, style}) => {
  const viewStyle = [
    globalStyles.border,
    globalStyles.borderRounded,
    globalStyles.whiteBackground,
    styles.card,
    Array.isArray(style) ? [...style] : style,
  ];
  if (slots === 1) {
    viewStyle.push(styles.oneCell);
  } else {
    viewStyle.push(styles.twoCell);
  }
  return <View style={viewStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    margin: 4,
    height: Dimensions.get('window').height / 4 - 13,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  oneCell: {
    flex: 1,
    minWidth: '45%',
  },
  twoCell: {
    flex: 2,
    minWidth: '90%',
  },
});
