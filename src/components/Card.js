import React from 'react';
import {View, TouchableHighlight, StyleSheet} from 'react-native';

export const Card = ({children, onPress}) => {
  return (
    <View style={styles.card}>
      <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '50%',
    height: '33%',
    display: 'flex',
    flex: 1,
    color: '#333',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 0,
    elevation: 5,
    justifyContent: 'center',
    lineHeight: 20,
    padding: 12,
  },
});
