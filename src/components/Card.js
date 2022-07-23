import React from 'react';
import {View, StyleSheet} from 'react-native';
import {globalStyles} from '../styles';

export const Card = ({children, slots = 1, style}) => {
  const viewStyle = [
    globalStyles.border,
    globalStyles.borderRounded,
    globalStyles.whiteBackground,
    styles.card,
    style,
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
    height: '24%',
    margin: 4,
  },
  oneCell: {
    minWidth: '45%',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  twoCell: {
    minWidth: '95%',
    flexGrow: 2,
    flexShrink: 0,
    flexBasis: 0,
  },
});
