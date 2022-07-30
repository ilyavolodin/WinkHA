import React, {useMemo, useCallback} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Icon} from '../Icon';
import {Card} from '../Card';
import {globalStyles, tokens} from '../../styles';

export const Switch = ({data, mqttClient, deviceName, topic}) => {
  const iconStyle = [];
  if (data.state !== 'off') {
    iconStyle.push(globalStyles.yellow, globalStyles.yellowBackground);
  } else {
    iconStyle.push(globalStyles.disabled, globalStyles.disabledBackground);
  }

  const payload = useMemo(
    () => ({
      target: `${data.class}.${deviceName}`,
      service: 'switch.toggle',
      class: data.class,
      serviceName: 'toggle',
    }),
    [data.class, deviceName],
  );

  const sendCommand = useCallback(() => {
    if (mqttClient) {
      mqttClient.publish(
        `WinkHA/actions/${topic}`,
        JSON.stringify(payload),
        1,
        false,
      );
    }
  }, [mqttClient, payload, topic]);

  return (
    <Card>
      <TouchableHighlight
        onPress={sendCommand}
        style={[globalStyles.borderRounded, styles.touch]}
        activeOpacity={0.9}
        underlayColor={tokens.colors.ha}>
        <View style={[globalStyles.centeredContent, styles.wrapper]}>
          <Icon
            name={
              data.attributes.icon
                ? data.attributes.icon.replace('mdi:', '')
                : 'light-switch'
            }
            iconStyles={[iconStyle]}
          />
          <Text
            style={[globalStyles.textNormal, globalStyles.bold, styles.title]}>
            {data.attributes.friendly_name}
          </Text>
        </View>
      </TouchableHighlight>
    </Card>
  );
};

const styles = StyleSheet.create({
  touch: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  title: {
    marginTop: 15,
  },
});
