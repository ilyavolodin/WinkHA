import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from './Card';
import {Overlay} from './Overlay';

export const Climate = ({data, mqttClient, deviceName}) => {
  const iconStyle = [styles.icon];
  const [modalVisible, setModalVisible] = useState(false);

  let icon = data.attributes.icon || 'fan';
  switch (data.state) {
    case 'cool':
      icon = data.attributes.icon ?? 'snowflake';
      iconStyle.push(styles.cool);
      break;
    case 'heat':
      icon = data.attributes.icon ?? 'fire';
      iconStyle.push(styles.heat);
      break;
    case 'auto':
    case 'heat_cool':
      icon = data.attributes.icon ?? 'autorenew';
      iconStyle.push(styles.heat_cool);
      break;
    case 'dry':
      icon = data.attributes.icon ?? 'water-percent';
      iconStyle.push(styles.dry);
      break;
    case 'fan_only':
      icon = data.attributes.icon ?? 'fan';
      iconStyle.push(styles.fan_only);
      break;
    case 'off':
    default:
      icon = data.attributes.icon ?? 'fan-off';
      iconStyle.push(styles.fan_off);
      break;
  }

  const tempDown = () => {
    console.log('Lower');
  };

  const tempUp = () => {
    console.log('Higher');
  };

  const config = () => {
    setModalVisible(true);
  };

  const turnOff = () => {
    console.log('Off');
    if (data.state === 'off') {
      config();
    } else {
      console.log('Off');
    }
  };

  return (
    <Card slots={2}>
      <View style={styles.topRow}>
        <TouchableHighlight style={styles.clickArea} onPress={turnOff}>
          <View style={styles.wrapper}>
            <Icon name={icon} style={iconStyle} />
            <View>
              <Text style={styles.title}>{data.attributes.friendly_name}</Text>
              <Text>Currently {data.state}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.targetTemp}>
          <TouchableHighlight onPress={tempDown}>
            <Icon
              name="minus"
              style={
                data.state !== 'off' ? styles.controls : styles.disabledControls
              }
            />
          </TouchableHighlight>
          <Text
            style={data.state !== 'off' ? styles.temp : styles.disabledTemp}>
            {data.attributes.temperature}°
          </Text>
          <TouchableHighlight onPress={tempUp}>
            <Icon
              name="plus"
              style={
                data.state !== 'off' ? styles.controls : styles.disabledControls
              }
            />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={styles.currentTempBlock}>
          <Icon name="home-thermometer" style={styles.lowerIcon} />
          <Text style={styles.currentTempText}>
            {data.attributes.current_temperature}°
          </Text>
        </View>
        <View>
          <TouchableHighlight onPress={config}>
            <Icon name="cog-outline" style={styles.lowerIcon} />
          </TouchableHighlight>
        </View>
      </View>
      <Overlay visible={modalVisible} changeVisibility={setModalVisible}>
        <View style={styles.dialog}>
          <View style={styles.topRow}>
            <TouchableHighlight style={styles.clickArea} onPress={turnOff}>
              <View style={styles.wrapper}>
                <Icon name={icon} style={iconStyle} />
                <View>
                  <Text style={styles.title}>
                    {data.attributes.friendly_name}
                  </Text>
                  <Text>Currently {data.state}</Text>
                </View>
              </View>
            </TouchableHighlight>
            <View>
              <View style={styles.modelTempsWrapper}>
                <Text style={styles.modelTemps}>
                  Target: {data.attributes.temperature}°
                </Text>
                <Text style={styles.modelTemps}>
                  Currently: {data.attributes.current_temperature}°
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.targetTemp, styles.modelTargetTemp]}>
            <TouchableHighlight onPress={tempDown}>
              <Icon
                name="minus"
                style={
                  data.state !== 'off'
                    ? styles.controls
                    : styles.disabledControls
                }
              />
            </TouchableHighlight>
            <Text
              style={data.state !== 'off' ? styles.temp : styles.disabledTemp}>
              {data.attributes.temperature}°
            </Text>
            <TouchableHighlight onPress={tempUp}>
              <Icon
                name="plus"
                style={
                  data.state !== 'off'
                    ? styles.controls
                    : styles.disabledControls
                }
              />
            </TouchableHighlight>
          </View>
        </View>
      </Overlay>
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
  clickArea: {
    flexDirection: 'row',
  },
  wrapper: {
    marginTop: -10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  targetTemp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temp: {
    fontSize: 65,
  },
  disabledTemp: {
    fontSize: 65,
    color: 'rgb(189, 189, 189)',
  },
  bottomRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    justifyContent: 'space-between',
  },
  controls: {
    fontSize: 60,
  },
  disabledControls: {
    fontSize: 60,
    color: 'rgb(189, 189, 189)',
  },
  icon: {
    flex: 1,
    fontSize: 50,
    maxWidth: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(189, 189, 189, .4)',
    color: 'rgb(189, 189, 189)',
    paddingLeft: 11,
    paddingTop: 10,
    marginRight: 10,
    marginTop: 20,
  },
  cool: {
    backgroundColor: 'rgba(43, 154, 249, .5)',
    color: 'rgb(43, 154, 249)',
  },
  heat: {
    backgroundColor: 'rgba(255, 129, 0, .5)',
    color: 'rgb(255, 129, 0)',
  },
  heat_cool: {
    backgroundColor: 'rgba(0, 128, 0, .5)',
    color: 'rgb(0, 128, 0)',
  },
  dry: {
    backgroundColor: 'rgba(239, 189, 7, .5)',
    color: 'rgb(239, 189, 7)',
  },
  fan_only: {
    backgroundColor: 'rgba(0, 128, 0, .5)',
    color: 'rgb(0, 128, 0)',
  },
  fan_off: {
    backgroundColor: 'rgba(189, 189, 189, .5)',
    color: 'rgb(189, 189, 189)',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 15,
  },
  currentTempBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lowerIcon: {
    fontSize: 50,
    color: '#555',
  },
  currentTempText: {
    fontSize: 35,
  },
  dialog: {
    alignItems: 'center',
  },
  modelTempsWrapper: {
    marginTop: 20,
  },
  modelTemps: {
    fontSize: 16,
  },
  modelTargetTemp: {
    marginTop: 30,
  },
});
