import React from 'react';
import {View, StyleSheet} from 'react-native';

export const Card = ({children, slots = 1, style}) => {
  const viewStyle = [styles.card, style];
  if (slots === 1) {
    viewStyle.push(styles.oneCell);
  } else {
    viewStyle.push(styles.twoCell);
  }
  return <View style={viewStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    height: '25%',
    display: 'flex',
    color: '#333',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    lineHeight: 20,
    borderColor: '#CCC',
    borderWidth: 2,
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
