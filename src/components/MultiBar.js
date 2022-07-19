import React, {useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const MultiBar = ({pages}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width);

  if (!Array.isArray(pages)) {
    throw new Error('Pages have to be an array of React components');
  }

  const items = pages.map((value, index) => index);

  const renderItems = ({index}) => pages[index];

  return (
    <View
      style={styles.multiBar}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
      }}>
      <Carousel
        layout={'default'}
        data={items}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  multiBar: {
    width: '100%',
  },
});
