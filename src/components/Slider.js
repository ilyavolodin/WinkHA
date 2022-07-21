import React, {useState} from 'react';
import {Slider as NativeSlider} from '@miblanchard/react-native-slider';
import {View, StyleSheet} from 'react-native';
import {globalStyles, tokens} from '../styles';

export const Slider = ({value: sliderValue = 0, onChange, style}) => {
  const [value, setValue] = useState(sliderValue);
  let sliderStyles = [
    globalStyles.grayBackground,
    globalStyles.borderRounded,
    styles.container,
  ];
  if (style && Array.isArray(sliderStyles)) {
    sliderStyles = sliderStyles.concat(style);
  } else if (style) {
    sliderStyles.push(style);
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.left,
          value !== 0 ? styles.blueBackground : styles.grayBackground,
        ]}
      />
      <NativeSlider
        containerStyle={styles.innerContainer}
        trackStyle={styles.track}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor={`rgb(${tokens.colors.blue})`}
        maximumTrackTintColor={`rgb(${tokens.colors.lightGrey})`}
        value={value}
        onSlidingComplete={onChange}
        onValueChange={([x]) => setValue(x)}
        trackClickable
        step={1}
        thumbStyle={styles.thumb}
        thumbTouchSize={{width: 50, hight: 80}}
      />
      <View
        style={[
          styles.right,
          value !== 100 ? styles.grayBackground : styles.blueBackground,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    flex: 1,
  },
  track: {
    height: '100%',
  },
  left: {
    borderTopLeftRadius: tokens.borderRadius.normal,
    borderBottomLeftRadius: tokens.borderRadius.normal,
    height: '100%',
    width: 10,
    flex: 0,
  },
  right: {
    borderTopRightRadius: tokens.borderRadius.normal,
    borderBottomRightRadius: tokens.borderRadius.normal,
    height: '100%',
    width: 10,
    flex: 0,
  },
  thumb: {
    backgroundColor: 'transparent',
    height: '100%',
    width: 0,
  },
  blueBackground: {
    backgroundColor: `rgb(${tokens.colors.blue})`,
  },
  grayBackground: {
    backgroundColor: `rgb(${tokens.colors.lightGrey})`,
  },
});
