import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from '../Icon';
import {Card} from '../Card';
import {globalStyles, tokens} from '../../styles';
import {MultiBar} from '../MultiBar';
import {Button} from '../Button';
import {Slider} from '../Slider';

export const Cover = ({data, mqttClient, deviceName, topic}) => {
  const multiBar = useRef(null);

  const iconStyle = [];
  if (data.state !== 'closed') {
    iconStyle.push(globalStyles.blue, globalStyles.blueBackground);
  } else {
    iconStyle.push(globalStyles.disabled, globalStyles.disabledBackground);
  }

  const changePayload = (position) => ({
    target: `${data.class}.${deviceName}`,
    service: 'cover.set_cover_position',
    class: data.class,
    serviceName: 'set_cover_position',
    data: {
      position,
    },
  });

  const stopPayload = {
    target: `${data.class}.${deviceName}`,
    service: 'cover.stop_cover',
    class: data.class,
    serviceName: 'stop_cover',
  };

  const change = (position) => {
    if (mqttClient) {
      mqttClient.publish(
        `WinkHA/actions/${topic}`,
        JSON.stringify(changePayload(position)),
        1,
        false,
      );
    }
  };

  const stop = () => {
    if (mqttClient) {
      mqttClient.publish(
        `WinkHA/actions/${topic}`,
        JSON.stringify(stopPayload),
        1,
        false,
      );
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.wrapper}>
          <Icon
            name={data.attributes.icon || 'curtains'}
            style={[styles.icon]}
            iconStyles={iconStyle}
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
              {data.state === 'closed'
                ? data.state
                : `${data.state} - ${data.attributes.position}%`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <MultiBar
          getMultiBarRef={(ref) => {
            multiBar.current = ref;
          }}
          pages={[
            <View style={styles.controlsList}>
              <Button onPress={() => change(0)} style={styles.buttons}>
                <Icon
                  name="arrow-down"
                  size={tokens.iconSizes.small}
                  iconStyles={[globalStyles.normalColor]}
                  removeBackground
                />
              </Button>
              <Button onPress={stop} style={styles.buttons}>
                <Icon
                  name="pause"
                  size={tokens.iconSizes.small}
                  iconStyles={[globalStyles.normalColor]}
                  removeBackground
                />
              </Button>
              <Button onPress={() => change(100)} style={styles.buttons}>
                <Icon
                  name="arrow-up"
                  size={tokens.iconSizes.small}
                  iconStyles={[globalStyles.normalColor]}
                  removeBackground
                />
              </Button>
            </View>,
            <View style={styles.sliderRow}>
              <Slider
                onChange={change}
                style={styles.slider}
                value={data.attributes.position}
              />
              <Button
                onPress={() => multiBar.current.snapToItem(0)}
                styles={styles.backButton}
                type="small">
                <Icon
                  name="gesture-tap-button"
                  removeBackground
                  size={tokens.iconSizes.small}
                  iconStyles={[globalStyles.normalColor]}
                />
              </Button>
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
  controlsList: {
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'row',
    marginHorizontal: -10,
  },
  buttons: {
    flex: 1,
    marginHorizontal: 10,
  },
  sliderRow: {
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'row',
    paddingRight: 5,
  },
});
