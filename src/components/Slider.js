import React, {useCallback} from 'react';
import {Slider as NativeSlider} from '@miblanchard/react-native-slider';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Color from 'color';
import {globalStyles, tokens} from '../styles';

export const Slider = ({
  value = 0,
  onChange,
  style,
  type = 'standard',
  min = 0,
  max = 100,
  disabled,
}) => {
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

  const processChange = useCallback(
    ([x]) => {
      switch (type) {
        case 'standard':
        case 'light':
        case 'colorTemp':
          onChange(x);
          break;
        case 'color':
          const color = Color.hsv(360 * ((x || 1) / 100), 100, 100);
          onChange(color.rgb().array());
          break;
      }
    },
    [type, onChange],
  );

  return (
    <View style={styles.base.container}>
      <View
        style={[
          styles.base.left,
          styles[type].styles.left,
          value !== min
            ? styles[type].styles.activeBackground
            : styles[type].styles.inactiveBackground,
        ]}
      />
      <NativeSlider
        containerStyle={styles.base.innerContainer}
        trackStyle={[styles.base.track, styles[type].styles.track]}
        minimumValue={min}
        maximumValue={max}
        minimumTrackTintColor={styles[type].colors.left}
        maximumTrackTintColor={styles[type].colors.right}
        value={value}
        onSlidingComplete={processChange}
        trackClickable
        step={1}
        thumbStyle={styles[type].styles.thumb}
        thumbTouchSize={{width: 50, hight: 80}}
        disabled={disabled}
      />
      <View
        style={[
          styles.base.right,
          styles[type].styles.right,
          value !== max
            ? styles[type].styles.inactiveBackground
            : styles[type].styles.activeBackground,
        ]}
      />
      {(type === 'color' || type === 'colorTemp') && (
        <View style={[styles.base.gradient]}>
          <LinearGradient
            style={[globalStyles.fullSize, styles.base.gradientBlock]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={styles[type].colors.gradient}
            locations={styles[type].colors.locations}
          />
        </View>
      )}
    </View>
  );
};

const styles = {
  base: {
    container: {
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingRight: 10,
    },
    innerContainer: {
      height: '100%',
      flex: 1,
      zIndex: 2,
    },
    track: {
      height: '100%',
    },
    left: {
      borderTopLeftRadius: tokens.borderRadius.normal,
      borderBottomLeftRadius: tokens.borderRadius.normal,
      flex: 0,
    },
    right: {
      borderTopRightRadius: tokens.borderRadius.normal,
      borderBottomRightRadius: tokens.borderRadius.normal,
      flex: 0,
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
      marginRight: 10,
    },
    gradientBlock: {
      borderRadius: tokens.borderRadius.normal,
    },
  },
  standard: {
    styles: StyleSheet.create({
      thumb: {
        backgroundColor: 'transparent',
        height: '100%',
        width: 0,
      },
      activeBackground: {
        backgroundColor: tokens.colors.blue,
      },
      inactiveBackground: {
        backgroundColor: tokens.colors.lightGrey,
      },
      left: {
        width: 10,
      },
      right: {
        width: 10,
      },
    }),
    colors: {
      left: tokens.colors.blue,
      right: tokens.colors.lightGrey,
    },
  },
  light: {
    styles: StyleSheet.create({
      thumb: {
        backgroundColor: 'transparent',
        height: '100%',
        width: 0,
      },
      activeBackground: {
        backgroundColor: tokens.colors.yellow,
      },
      inactiveBackground: {
        backgroundColor: tokens.colors.lightGrey,
      },
      left: {
        width: 10,
      },
      right: {
        width: 10,
      },
    }),
    colors: {
      left: tokens.colors.yellow,
      right: tokens.colors.lightGrey,
    },
  },
  colorTemp: {
    styles: StyleSheet.create({
      thumb: {
        backgroundColor: tokens.colors.white,
        borderRadius: tokens.borderRadius.small,
        borderWidth: 1,
        borderColor: tokens.colors.lightGrey,
        height: '100%',
        width: 15,
      },
      inactiveBackground: {
        backgroundColor: 'transparent',
      },
      activeBackground: {
        backgroundColor: 'transparent',
      },
    }),
    colors: {
      left: 'transparent',
      right: 'transparent',
      gradient: ['#a6d1ff', '#fff', '#ffa000'],
      locations: [0, 0.5, 1],
    },
  },
  color: {
    styles: StyleSheet.create({
      thumb: {
        backgroundColor: tokens.colors.white,
        borderRadius: tokens.borderRadius.small,
        borderWidth: 1,
        borderColor: tokens.colors.lightGrey,
        height: '100%',
        width: 15,
      },
      inactiveBackground: {
        backgroundColor: 'transparent',
      },
      activeBackground: {
        backgroundColor: 'transparent',
      },
    }),
    colors: {
      left: 'transparent',
      right: 'transparent',
      gradient: ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'],
      locations: [0, 0.17, 0.33, 0.5, 0.66, 0.83, 1],
    },
  },
};
