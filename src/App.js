import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';
import {establishConnection} from './websockets';

import {Card} from './components/Card';
import {subscribeEntities} from 'home-assistant-js-websocket';

const App = () => {
  const connectionPromise = establishConnection('https://ha.ivolodin.com');
  // connectionPromise.then((connection) => {
  //   subscribeEntities(connection, (entities) => console.log(entities));
  // });
  const onPress = () => {
    console.log('Test');
  };
  return (
    <SafeAreaView style={{backgroundColor: 'red'}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        <View style={styles.body}>
          <View style={styles.container}>
            <Card onPress={onPress}>
              <Text>Hello</Text>
            </Card>
            <Card onPress={onPress}>
              <Text>Second Hello</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'blue',
    height: '100%',
  },
  body: {
    backgroundColor: '#FAFAFA',
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
