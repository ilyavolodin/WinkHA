import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const MultiBar = ({
  pages,
  getMultiBarRef = () => {},
  size = 2,
  style,
}) => {
  const [width, setWidth] = useState(null);
  let carousel = null;

  if (!Array.isArray(pages)) {
    throw new Error('Pages have to be an array of React components');
  }

  useEffect(() => {
    if (carousel) {
      getMultiBarRef(carousel);
    }
  }, [carousel, getMultiBarRef]);

  const items = pages.map((value, index) => index);

  const renderItems = ({index}) => pages[index];

  return (
    <View
      style={[styles.multiBar, Array.isArray(style) ? [...style] : style]}
      onLayout={(event) => {
        const {width} = event.nativeEvent.layout;
        setWidth(width);
      }}>
      {width && (
        <Carousel
          ref={(c) => {
            carousel = c;
          }}
          layout={'default'}
          data={items}
          sliderWidth={width}
          itemWidth={width}
          renderItem={renderItems}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  multiBar: {
    flex: 1,
  },
});
