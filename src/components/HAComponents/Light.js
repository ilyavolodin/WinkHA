/* eslint-disable no-bitwise */
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {Icon} from '../Icon';
import {Card} from '../Card';
import {MultiBar} from '../MultiBar';
import {globalStyles, tokens} from '../../styles';
import {Slider} from '../Slider';
import {Button} from '../Button';
import Color from 'color';

export const Light = ({data, mqttClient, deviceName, topic}) => {
  const [page, setPage] = useState(0);
  const multiBar = useRef(null);
  const supportedFeatures = useMemo(
    () => ({
      SUPPORT_BRIGHTNESS: 1,
      SUPPORT_COLOR_TEMP: 2,
      SUPPORT_EFFECT: 4,
      SUPPORT_FLASH: 8,
      SUPPORT_COLOR: 16,
      SUPPORT_TRANSITION: 32,
      SUPPORT_WHITE_VALUE: 128,
    }),
    [],
  );

  const features = useMemo(
    () => ({
      color:
        data.attributes.supported_features & supportedFeatures.SUPPORT_COLOR,
      brightness:
        data.attributes.supported_features &
          supportedFeatures.SUPPORT_BRIGHTNESS ||
        data.attributes.supported_features &
          supportedFeatures.SUPPORT_TRANSITION,
      colorTemp:
        data.attributes.supported_features &
        supportedFeatures.SUPPORT_COLOR_TEMP,
    }),
    [data.attributes.supported_features, supportedFeatures],
  );

  const iconStyle = [];
  if (data.state !== 'off') {
    iconStyle.push(globalStyles.yellow, globalStyles.yellowBackground);
  } else {
    iconStyle.push(globalStyles.disabled, globalStyles.disabledBackground);
  }

  const payloadToggle = {
    target: `${data.class}.${deviceName}`,
    service: 'light.toggle',
    class: data.class,
    serviceName: 'toggle',
  };

  const sendCommandToggle = () => {
    if (mqttClient) {
      mqttClient.publish(
        `WinkHA/actions/${topic}`,
        JSON.stringify(payloadToggle),
        1,
        false,
      );
    }
  };

  const payloadProps = useCallback(
    (type, value) => {
      const result = {
        target: `${data.class}.${deviceName}`,
        service: 'light.turn_on',
        class: data.class,
        serviceName: 'turn_on',
        data: {},
      };
      switch (type) {
        case 'brightness':
          result.data = {
            brightness: value,
          };
          break;
        case 'color':
          console.log(value);
          result.data = {
            rgb_color: value,
          };
          break;
        case 'colorTemp':
          result.data = {
            color_temp: value,
          };
          break;
      }
      return result;
    },
    [data.class, deviceName],
  );

  const sendCommandProps = useCallback(
    (type, value) => {
      if (mqttClient) {
        mqttClient.publish(
          'WinkHA/actions/LivingRoom',
          JSON.stringify(payloadProps(type, value)),
          1,
          false,
        );
      }
    },
    [mqttClient, payloadProps],
  );

  const colorToPosition = (color) => {
    return (Color(color).hsv().hue() / 360) * 100;
  };

  const positionToRgb = (value) => {
    return Color.hsv((360 * value) / 100, 100, 100)
      .rgb()
      .array();
  };

  const next = useCallback(() => {
    if (page < Object.keys(features).length - 1) {
      multiBar.current.snapToItem(page + 1);
      setPage(page + 1);
    } else {
      multiBar.current.snapToItem(0);
      setPage(0);
    }
  }, [features, page]);

  const bottomControls = useCallback(() => {
    const controls = [];

    if (features.brightness) {
      controls.push(
        <View style={styles.controls}>
          <Slider
            style={styles.slider}
            type="light"
            min={0}
            max={255}
            value={data.attributes.brightness || 0}
            onChange={(x) => sendCommandProps('brightness', x)}
            disabled={data.state === 'off'}
          />
          {Object.keys(features).length > 1 && (
            <Button type="small" style={styles.button} onPress={next}>
              <Icon
                name="chevron-right"
                size={tokens.iconSizes.small}
                style={[globalStyles.normalColor]}
                removeBackground
              />
            </Button>
          )}
        </View>,
      );
    }

    if (features.colorTemp) {
      controls.push(
        <View style={styles.controls}>
          <Slider
            style={styles.slider}
            type="colorTemp"
            value={data.attributes.color_temp || data.attributes.min_mireds}
            onChange={(x) => sendCommandProps('colorTemp', x)}
            min={data.attributes.min_mireds}
            max={data.attributes.max_mireds}
            disabled={data.state === 'off'}
          />
          {Object.keys(features).length > 1 && (
            <Button type="small" style={styles.button} onPress={next}>
              <Icon
                name="chevron-right"
                size={tokens.iconSizes.small}
                style={[globalStyles.normalColor]}
                removeBackground
              />
            </Button>
          )}
        </View>,
      );
    }

    if (features.color) {
      controls.push(
        <View style={styles.controls}>
          <Slider
            style={styles.slider}
            type="color"
            value={colorToPosition(data.attributes.rgb_color || ['#F00'])}
            onChange={(x) => sendCommandProps('color', x)}
            disabled={data.state === 'off'}
          />
          {Object.keys(features).length > 1 && (
            <Button type="small" style={styles.button} onPress={next}>
              <Icon
                name="chevron-right"
                size={tokens.iconSizes.small}
                style={[globalStyles.normalColor]}
                removeBackground
              />
            </Button>
          )}
        </View>,
      );
    }
    return controls;
  }, [
    features,
    data.attributes.rgb_color,
    data.attributes.color_temp,
    data.attributes.brightness,
    data.attributes.min_mireds,
    data.attributes.max_mireds,
    data.state,
    next,
    sendCommandProps,
  ]);

  return (
    <Card style={styles.card} slots={2}>
      <View style={styles.topRow}>
        <View style={[globalStyles.fullSize, styles.wrapper]}>
          <TouchableHighlight onPress={sendCommandToggle}>
            <Icon
              name={
                data.attributes.icon
                  ? data.attributes.icon.replace('mdi:', '')
                  : 'lightbulb'
              }
              iconStyles={[iconStyle]}
            />
          </TouchableHighlight>
          <Text
            style={[globalStyles.textNormal, globalStyles.bold, styles.title]}>
            {data.attributes.friendly_name}
          </Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <MultiBar
          getMultiBarRef={(ref) => {
            multiBar.current = ref;
          }}
          pages={bottomControls()}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 5,
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 15,
  },
  controls: {
    alignItems: 'stretch',
    alignContent: 'stretch',
    flexDirection: 'row',
  },
  slider: {
    flex: 1,
  },
  button: {
    flex: 0,
    marginRight: 3,
  },
});
