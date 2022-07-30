import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {globalStyles, tokens} from '../../styles';
import {Button} from '../Button';
import {Card} from '../Card';
import {Icon} from '../Icon';
import {MultiBar} from '../MultiBar';
import {Pill} from '../Pill';

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

export const Climate = ({data, mqttClient, deviceName, topic}) => {
  const climateModes = useCallback(() => {
    const modeButtons = [];
    data.attributes.hvac_modes.forEach((item) => {
      const hvacModeIconStyle = [
        hvacModes[item] ? hvacModes[item].iconStyle : globalStyles.disabled,
      ];
      modeButtons.push(
        <Button
          onPress={() => change(item, data.attributes.temperature)}
          key={item}
          style={[
            item === data.state ? hvacModes[item].backgroundStyle : '',
            styles.hvacModeButton,
          ]}>
          <Icon
            name={hvacModes[item] ? hvacModes[item].icon : hvacModes.off.icon}
            iconStyles={hvacModeIconStyle}
            size={tokens.iconSizes.small}
            removeBackground
          />
        </Button>,
      );
    });
    return modeButtons;
  }, [
    change,
    data.attributes.hvac_modes,
    data.attributes.temperature,
    data.state,
  ]);

  const payload = useCallback(
    (mode, temp) => ({
      target: `${data.class}.${deviceName}`,
      service: 'climate.set_temperature',
      class: data.class,
      serviceName: 'set_temperature',
      data: {
        hvac_mode: mode,
        temperature: temp,
      },
    }),
    [data.class, deviceName],
  );

  const change = useCallback(
    (mode, temperature) => {
      if (mqttClient) {
        mqttClient.publish(
          `WinkHA/actions/${topic}`,
          JSON.stringify(payload(mode, temperature)),
          1,
          false,
        );
      }
    },
    [mqttClient, payload, topic],
  );

  return (
    <Card slots={2} style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.wrapper}>
          <Icon
            name={data.attributes.icon || 'home-thermometer-outline'}
            badgeName={hvacModes[data.state].icon}
            badgeStyles={[hvacModes[data.state].backgroundStyle]}
            style={[styles.icon]}
          />
          <View style={styles.text}>
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
          pages={[
            <View style={styles.hvacModesList}>{climateModes()}</View>,
            <View>
              <Pill>
                <TouchableHighlight
                  onPress={() =>
                    change(data.state, data.attributes.temperature - 1)
                  }
                  activeOpacity={0.9}
                  underlayColor={tokens.colors.ha}
                  style={globalStyles.borderRounded}>
                  <Icon
                    name="minus"
                    removeBackground
                    size={tokens.iconSizes.small}
                    iconStyles={[globalStyles.normalColor]}
                  />
                </TouchableHighlight>
                <Text style={[globalStyles.textLarge, globalStyles.bold]}>
                  {data.attributes.temperature}°
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    change(data.state, data.attributes.temperature + 1)
                  }
                  activeOpacity={0.9}
                  underlayColor={tokens.colors.ha}
                  style={globalStyles.borderRounded}>
                  <Icon
                    name="plus"
                    removeBackground
                    size={tokens.iconSizes.small}
                    iconStyles={[globalStyles.normalColor]}
                  />
                </TouchableHighlight>
              </Pill>
            </View>,
          ]}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  topRow: {
    flex: 2,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  wrapper: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    flex: 0,
  },
  text: {
    flex: 1,
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
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
