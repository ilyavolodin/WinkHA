import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export const Switch = ({data}) => {
    console.log(data.attributes.icon.replace('mdi:', ''));
  return (
    <View style={styles.switch}>
        <Text>{data.attributes.friendly_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: '100%',
    height: '100%'
  }
});