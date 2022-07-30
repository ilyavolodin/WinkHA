import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import {Switch} from './components/HAComponents/Switch';
import {Climate} from './components/HAComponents/Climate';
import {Cover} from './components/HAComponents/Cover';
import {Card} from './components/Card';
import {Light} from './components/HAComponents/Light';

export const Main = ({deviceName, state, mqttClient}) => {
  const content = useCallback(
    (item) => {
      const itemName = Object.keys(item)[0];
      const entity = item[itemName];
      if (entity.class === 'switch') {
        return (
          <Switch
            data={entity}
            mqttClient={mqttClient.current}
            key={itemName}
            deviceName={itemName}
            topic={deviceName}
          />
        );
      }
      if (entity.class === 'climate') {
        return (
          <Climate
            data={entity}
            mqttClient={mqttClient.current}
            key={itemName}
            deviceName={itemName}
            topic={deviceName}
          />
        );
      }
      if (entity.class === 'cover') {
        return (
          <Cover
            data={entity}
            mqttClient={mqttClient.current}
            key={itemName}
            deviceName={itemName}
            topic={deviceName}
          />
        );
      }
      if (entity.class === 'light') {
        return (
          <Light
            data={entity}
            mqttClient={mqttClient.current}
            key={itemName}
            deviceName={itemName}
            topic={deviceName}
          />
        );
      }
      return (
        <Card key={itemName}>
          <Text>
            {entity.attributes.friendly_name} - {entity.state}
          </Text>
        </Card>
      );
    },
    [deviceName, mqttClient],
  );
  const items = state.map((item) => content(item));
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.scrollView}>
      <View style={styles.body}>
        <View style={styles.container}>{items}</View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  body: {
    flex: 1,
    backgroundColor: '#EEE',
    padding: 10,
    alignContent: 'stretch',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
});
