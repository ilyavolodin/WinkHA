import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

export const Card = ({children, onPress}) => {
  return (
    <TouchableHighlight onPress={onPress} style={styles.card}>
      <View>{children}</View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '50%',
    minWidth: '45%',
    height: '33%',
    display: 'flex',
    flex: 1,
    color: '#333',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    margin: 4,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    lineHeight: 20,
    padding: 12,
    borderColor: '#CCC',
    borderWidth: 2,
  },
});
