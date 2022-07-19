import React from 'react';
import {View, StyleSheet} from 'react-native';

import {globalStyles} from '../styles';

export const Pill = ({children}) => {
  return (
    <View
      style={[
        globalStyles.grayBackground,
        globalStyles.borderRounded,
        styles.pill,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    height: '100%',
    flexDirection: 'row',
  },
});
