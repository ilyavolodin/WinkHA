import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import {Card} from './components/Card';
import {Switch} from './components/Switch';
import { connect } from './data';

const App = () => {
  const [state, setState] = useState([]);
  useEffect(() => {
    connect(setState);
  }, []);
  const onPress = () => {
    console.log('Test');
  };
  const content = (item) => {
    if (item['class'] === 'switch') {
      return (
        <Switch data={item} />
      );
    }
    return (
      <Text>{item.attributes.friendly_name} - {item.state}</Text>
    );
  }
  console.log(state);
  const items = state.map((item) => {
    const itemName = Object.keys(item)[0];
    return (
      <Card onPress={onPress} key={itemName}>
        {content(item[itemName])}
      </Card>
    );
  });
  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.container}>
              {items}
            </View>
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
