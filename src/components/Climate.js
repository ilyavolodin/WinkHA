import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {globalStyles, tokens} from '../styles';
import {Card} from './Card';
import {Icon} from './Icon';
import {MultiBar} from './MultiBar';

export const Climate = ({data, mqttClient, deviceName}) => {
  const hvacModes = {
    cool: {
      icon: 'snowflake',
      iconStyle: globalStyles.blue,
      backgroundStyle: globalStyles.blueBackground,
    },
    heat: {
      icon: 'fire',
      iconStyle: globalStyles.red,
      backgroundStyle: globalStyles.redBackground,
    },
    heat_cool: {
      icon: 'autorenew',
      iconStyle: globalStyles.green,
      backgroundStyle: globalStyles.greenBackground,
    },
    auto: {
      icon: 'autorenew',
      iconStyle: globalStyles.green,
      backgroundStyle: globalStyles.greenBackground,
    },
    dry: {
      icon: 'water-percent',
      iconStyle: globalStyles.yellow,
      backgroundStyle: globalStyles.yellowBackground,
    },
    fan_only: {
      icon: 'fan',
      iconStyle: globalStyles.green,
      backgroundStyle: globalStyles.greenBackground,
    },
    off: {
      icon: 'fan-off',
      iconStyle: globalStyles.disabled,
      backgroundStyle: globalStyles.disabledBackground,
    },
  };

  const climateModes = () => {
    const modeButtons = [];
    data.attributes.hvac_modes.forEach((item) => {
      const hvacModeIconStyle = [
        hvacModes[item] ? hvacModes[item].iconStyle : globalStyles.disabled,
        globalStyles.transparentBackground,
      ];
      modeButtons.push(
        <TouchableHighlight
          onTouch={() => changeMode(item)}
          key={item}
          style={[
            globalStyles.borderRounded,
            item === data.state
              ? hvacModes[item].backgroundStyle
              : globalStyles.disabledBackground,
            styles.hvacModeButton,
          ]}>
          <Icon
            name={hvacModes[item] ? hvacModes[item].icon : hvacModes.off.icon}
            iconStyles={hvacModeIconStyle}
            size={tokens.iconSizes.small}
          />
        </TouchableHighlight>,
      );
    });
    return modeButtons;
  };

  const changeMode = (mode) => {
    console.log(`Changing Mode to ${mode}`);
  };

  const tempDown = () => {
    console.log('Lower');
  };

  const tempUp = () => {
    console.log('Higher');
  };

  const multiBarToggle = useRef();

  const toggleMultiBarSetup = (ref) => {
    multiBarToggle.current = ref;
  };

  return (
    <Card slots={2}>
      <View style={styles.topRow}>
        <View style={styles.wrapper}>
          <Icon
            name={data.attributes.icon || 'home-thermometer-outline'}
            badgeName={hvacModes[data.state].icon}
            style={[styles.icon]}
          />
          <View>
            <Text
              style={[
                globalStyles.textNormal,
                globalStyles.bold,
                styles.title,
              ]}>
              {data.attributes.friendly_name}
            </Text>
            <Text style={[globalStyles.textNormal]}>
              {data.state} - {data.attributes.current_temperature}°
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <MultiBar
          toggle={toggleMultiBarSetup}
          firstPage={<View style={styles.hvacModesList}>{climateModes()}</View>}
          secondPage={
            <TouchableHighlight onPress={() => multiBarToggle.current()}>
              <View />
            </TouchableHighlight>
          }
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  topRow: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  wrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: 'space-between',
  },
  hvacModesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hvacModeButton: {
    paddingHorizontal: 5,
  },
});
