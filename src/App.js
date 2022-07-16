import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text} from 'react-native';

import {Card} from './components/Card';

const App = () => {
  const onPress = () => {
    console.log('Test');
  };
  return (
    <SafeAreaView>
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
              <Card onPress={onPress}>
                <Text>Third Hello</Text>
              </Card>
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
