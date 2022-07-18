import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from './Card';

export const Switch = ({data, mqttClient, deviceName}) => {
  const iconStyle = [styles.icon];
  if (data.state !== 'off') {
    iconStyle.push(styles.active);
  }

  const payload = {
    target: `${data.class}.${deviceName}`,
    service: 'switch.toggle',
    class: data.class,
    serviceName: 'toggle',
  };

  const sendCommand = () => {
    console.log('Trying to send command', mqttClient);
    if (mqttClient) {
      mqttClient.publish(
        'WinkHA/actions/LivingRoom',
        JSON.stringify(payload),
        1,
        false,
      );
    }
  };

  return (
    <Card>
      <TouchableHighlight
        onPress={sendCommand}
        style={[styles.wrapper, styles.touch]}>
        <View style={styles.wrapper}>
          <Icon
            name={
              data.attributes.icon
                ? data.attributes.icon.replace('mdi:', '')
                : 'light-switch'
            }
            style={iconStyle}
          />
          <Text style={styles.title}>{data.attributes.friendly_name}</Text>
        </View>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  touch: {
    borderRadius: 12,
    padding: 12,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(189, 189, 189, .4)',
    color: 'rgb(189, 189, 189)',
    paddingLeft: 15,
    paddingTop: 14,
  },
  active: {
    backgroundColor: 'rgba(255, 235, 59, .5)',
    color: 'rgb(255, 235, 59)',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 15,
  },
});
