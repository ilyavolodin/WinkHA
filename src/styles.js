import {StyleSheet} from 'react-native';

const tokens = {
  fontSizes: {
    xSmall: 12,
    small: 14,
    normal: 16,
    large: 18,
    xLarge: 35,
    xxLarge: 50,
    xxxLarge: 65,
  },
  iconSizes: {
    small: 30,
    normal: 40,
    large: 50,
  },
  badgeSizes: {
    small: 30 / 2,
    normal: 40 / 2,
    large: 50 / 2,
  },
  colors: {
    disabled: '189, 189, 189',
    green: '0, 128, 0',
    red: '255, 129, 0',
    blue: '43, 154, 249',
    yellow: '239, 189, 7',
    normal: '33, 33, 33',
    grey: '204, 204, 204',
    lightGrey: '230, 230, 230',
    white: '255, 255, 255',
    black: '0, 0, 0',
  },
  fontWeight: {
    normal: '400',
    bold: '700',
  },
  borderRadius: {
    normal: 12,
    small: 5,
  },
};

const globalStyles = StyleSheet.create({
  fullSize: {
    width: '100%',
    height: '100%',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textXSmall: {
    fontSize: tokens.fontSizes.xSmall,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textSmall: {
    fontSize: tokens.fontSizes.small,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textNormal: {
    fontSize: tokens.fontSizes.normal,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textLarge: {
    fontSize: tokens.fontSizes.large,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textXLarge: {
    fontSize: tokens.fontSizes.xLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textXXLarge: {
    fontSize: tokens.fontSizes.xxLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  textXXXLarge: {
    fontSize: tokens.fontSizes.xxxLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: `rgb(${tokens.colors.normal})`,
  },
  iconSmall: {
    fontSize: tokens.iconSizes.small,
  },
  iconNormal: {
    fontSize: tokens.iconSizes.normal,
  },
  iconLarge: {
    fontSize: tokens.iconSizes.large,
  },
  green: {
    color: `rgb(${tokens.colors.green})`,
  },
  red: {
    color: `rgb(${tokens.colors.red})`,
  },
  blue: {
    color: `rgb(${tokens.colors.blue})`,
  },
  yellow: {
    color: `rgb(${tokens.colors.yellow})`,
  },
  white: {
    color: `rgb(${tokens.colors.white})`,
  },
  disabled: {
    color: `rgb(${tokens.colors.disabled})`,
  },
  normalColor: {
    color: `rgb(${tokens.colors.normal})`,
  },
  greenBackground: {
    backgroundColor: `rgba(${tokens.colors.green}, .5)`,
  },
  redBackground: {
    backgroundColor: `rgba(${tokens.colors.red}, .5)`,
  },
  blueBackground: {
    backgroundColor: `rgba(${tokens.colors.blue}, .5)`,
  },
  yellowBackground: {
    backgroundColor: `rgba(${tokens.colors.yellow}, .5)`,
  },
  disabledBackground: {
    backgroundColor: `rgba(${tokens.colors.disabled}, .5)`,
  },
  whiteBackground: {
    backgroundColor: `rgb(${tokens.colors.white})`,
  },
  grayBackground: {
    backgroundColor: `rgb(${tokens.colors.lightGrey})`,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  tokenGreenBackground: {
    backgroundColor: `rgb(${tokens.colors.green})`,
    color: `rgb(${tokens.colors.white})`,
  },
  tokenRedBackground: {
    backgroundColor: `rgb(${tokens.colors.red})`,
    color: `rgb(${tokens.colors.white})`,
  },
  tokenBlueBackground: {
    backgroundColor: `rgb(${tokens.colors.blue})`,
    color: `rgb(${tokens.colors.white})`,
  },
  tokenYellowBackground: {
    backgroundColor: `rgb(${tokens.colors.yellow})`,
    color: `rgb(${tokens.colors.black})`,
  },
  tokenDisabledBackground: {
    backgroundColor: `rgb(${tokens.colors.disabled})`,
    color: `rgb(${tokens.colors.white})`,
  },
  border: {
    borderColor: `rgb(${tokens.colors.grey})`,
    borderWidth: 2,
  },
  borderRounded: {
    borderRadius: tokens.borderRadius.normal,
  },
  bold: {
    fontWeight: tokens.fontWeight.bold,
  },
  circle: (size) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
  }),
});

export {tokens, globalStyles};
