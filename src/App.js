import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import {Switch} from './components/HAComponents/Switch';
import {Climate} from './components/HAComponents/Climate';
import {Cover} from './components/HAComponents/Cover';
import {connect} from './data';
import {Card} from './components/Card';
import {Light} from './components/HAComponents/Light';

const App = () => {
  const [state, setState] = useState([]);
  let mqttClient = useRef(null);
  useEffect(() => {
    const mqttConnect = async () => {
      mqttClient.current = await connect(setState);
      RNBootSplash.hide();
    };
    mqttConnect();
  }, []);
  const content = (item) => {
    const itemName = Object.keys(item)[0];
    const entity = item[itemName];
    if (entity.class === 'switch') {
      return (
        <Switch
          data={entity}
          mqttClient={mqttClient.current}
          key={itemName}
          deviceName={itemName}
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
  };
  // console.log(state);
  const items = state.map((item) => content(item));
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.container}>{items}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height: '100%',
  },
  body: {
    backgroundColor: '#EEE',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
  },
});

export default App;
