import {StyleSheet} from 'react-native';

const tokens = {
  fontSizes: {
    xSmall: 12,
    small: 14,
    normal: 16,
    large: 18,
    textInput: 25,
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
    disabled: '#bdbdbd',
    green: '#008000',
    red: '#ff8100',
    blue: '#2b9af9',
    yellow: '#efbd07',
    normal: '#212121',
    grey: '#cccccc',
    lightGrey: '#e6e6e6',
    white: '#fff',
    black: '#000',
    ha: '#41bdf5',
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
    color: tokens.colors.normal,
  },
  textSmall: {
    fontSize: tokens.fontSizes.small,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
  },
  textNormal: {
    fontSize: tokens.fontSizes.normal,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
  },
  textLarge: {
    fontSize: tokens.fontSizes.large,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
  },
  textXLarge: {
    fontSize: tokens.fontSizes.xLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
  },
  textXXLarge: {
    fontSize: tokens.fontSizes.xxLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
  },
  textXXXLarge: {
    fontSize: tokens.fontSizes.xxxLarge,
    fontFamily: 'Roboto',
    fontWeight: tokens.fontWeight.normal,
    color: tokens.colors.normal,
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
    color: tokens.colors.green,
  },
  red: {
    color: tokens.colors.red,
  },
  blue: {
    color: tokens.colors.blue,
  },
  yellow: {
    color: tokens.colors.yellow,
  },
  white: {
    color: tokens.colors.white,
  },
  disabled: {
    color: tokens.colors.disabled,
  },
  normalColor: {
    color: tokens.colors.normal,
  },
  greenBackground: {
    backgroundColor: `${tokens.colors.green}80`,
  },
  redBackground: {
    backgroundColor: `${tokens.colors.red}80`,
  },
  blueBackground: {
    backgroundColor: `${tokens.colors.blue}80`,
  },
  yellowBackground: {
    backgroundColor: `${tokens.colors.yellow}80`,
  },
  disabledBackground: {
    backgroundColor: `${tokens.colors.disabled}80`,
  },
  whiteBackground: {
    backgroundColor: tokens.colors.white,
  },
  grayBackground: {
    backgroundColor: tokens.colors.lightGrey,
  },
  haBackground: {
    backgroundColor: tokens.colors.ha,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  tokenGreenBackground: {
    backgroundColor: tokens.colors.green,
    color: tokens.colors.white,
  },
  tokenRedBackground: {
    backgroundColor: tokens.colors.red,
    color: tokens.colors.white,
  },
  tokenBlueBackground: {
    backgroundColor: tokens.colors.blue,
    color: tokens.colors.white,
  },
  tokenYellowBackground: {
    backgroundColor: tokens.colors.yellow,
    color: tokens.colors.black,
  },
  tokenDisabledBackground: {
    backgroundColor: tokens.colors.disabled,
    color: tokens.colors.white,
  },
  border: {
    borderColor: tokens.colors.grey,
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
