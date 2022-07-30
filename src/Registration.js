import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {globalStyles, tokens} from './styles';
import {Button} from './components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Regististration = ({updateAppState}) => {
  const [deviceName, setDeviceName] = useState('');
  const [serverUrl, setServerUrl] = useState('');
  const [serverPort, setServerPort] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const first = useRef(null);
  const second = useRef(null);
  const third = useRef(null);
  const forth = useRef(null);
  const fifth = useRef(null);

  const save = async () => {
    console.log(deviceName);
    console.log({serverUrl, serverPort, username, password});
    try {
      await AsyncStorage.setItem('@deviceName', deviceName);
      await AsyncStorage.setItem(
        '@mqttInfo',
        JSON.stringify({
          serverUrl,
          serverPort,
          username,
          password,
        }),
      );
      updateAppState({
        deviceName,
        mqttInfo: {
          serverUrl,
          serverPort,
          username,
          password,
        },
      });
    } catch (e) {
      // error handling
      console.log(e);
    }
  };
  const focusTextInput = (node) => {
    node.current.focus();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[globalStyles.haBackground, styles.scrollView]}>
        <View style={styles.body}>
          <View style={styles.inputs}>
            <TextInput
              style={[styles.input]}
              placeholder="Relay name"
              autoCapitalize="none"
              onChangeText={setDeviceName}
              returnKeyLabel="Next"
              ref={first}
              onSubmitEditing={() => focusTextInput(second)}
              blurOnSubmit={false}
              autoComplete={false}
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input]}
              placeholder="MQTT server address"
              keyboardType="url"
              autoCapitalize="none"
              onChangeText={setServerUrl}
              onSubmitEditing={() => focusTextInput(third)}
              returnKeyLabel="Next"
              ref={second}
              autoComplete={false}
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input]}
              placeholder="MQTT server port"
              keyboardType="number-pad"
              autoCapitalize="none"
              onChangeText={setServerPort}
              onSubmitEditing={() => focusTextInput(forth)}
              returnKeyLabel="Next"
              ref={third}
              autoComplete={false}
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input]}
              placeholder="MQTT server user"
              autoCapitalize="none"
              onChangeText={setUsername}
              onSubmitEditing={() => focusTextInput(fifth)}
              returnKeyLabel="Next"
              ref={forth}
              autoComplete={false}
              autoCorrect={false}
            />
            <TextInput
              style={[styles.input]}
              placeholder="MQTT server password"
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={setPassword}
              onSubmitEditing={save}
              returnKeyLabel="Save"
              ref={fifth}
              autoComplete={false}
              autoCorrect={false}
            />
          </View>
          <View style={styles.save}>
            <Button style={styles.button} onPress={save}>
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 40,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollView: {
    height: '100%',
  },
  input: {
    borderRadius: tokens.borderRadius.normal,
    borderWidth: 1,
    borderColor: tokens.colors.blue,
    backgroundColor: tokens.colors.white,
    margin: 20,
    fontSize: tokens.fontSizes.textInput,
  },
  save: {
    margin: 2,
    borderWidth: 2,
    borderColor: tokens.colors.white,
    borderRadius: tokens.borderRadius.normal,
    alignSelf: 'center',
    marginBottom: 40,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: tokens.colors.white,
    borderColor: tokens.colors.blue,
    borderWidth: 3,
  },
  buttonText: {
    fontSize: tokens.fontSizes.xLarge,
    color: tokens.colors.blue,
    paddingHorizontal: 40,
    paddingVertical: 5,
  },
});
