import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const MultiBar = ({firstPage, secondPage, toggle}) => {
  const [page, setPage] = useState(true);

  if (toggle && typeof toggle === 'function') {
    toggle(() => setPage(!page));
  }

  return (
    <View style={styles.multiBar}>
      {page && firstPage}
      {!page && secondPage}
    </View>
  );
};

const styles = StyleSheet.create({
  multiBar: {
    width: '100%',
  },
});
