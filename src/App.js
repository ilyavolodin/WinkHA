import React, {useState, useEffect, useRef, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Regististration} from './Registration';
import {Main} from './Main';
import {connect} from './data';
import {ErrorBoundary} from './components/ErrorBoundary';
import {Notifications} from './components/Notifications';

const App = () => {
  const [appState, setAppState] = useState(null);
  const [state, setState] = useState(null);
  let mqttClient = useRef(null);
  useEffect(() => {
    console.log('Connecting to mqtt server');
    const getData = async () => {
      if (!appState) {
        console.log('Getting info from storage');
        try {
          const value = await AsyncStorage.getItem('@deviceName');
          const info = await AsyncStorage.getItem('@mqttInfo');
          if (value !== null && info !== null) {
            console.log('Setting info');
            setAppState({
              deviceName: value,
              mqttInfo: JSON.parse(info),
            });
          } else {
            // close splash and go to registration
            RNBootSplash.hide();
          }
        } catch (e) {
          // error handling
          console.log(e);
        }
      } else {
        console.log('Connecting to mqtt', appState);
        mqttClient.current = await connect(
          setState,
          appState.deviceName,
          appState.mqttInfo,
        );
        if ((await RNBootSplash.getVisibilityStatus()) === 'visible') {
          RNBootSplash.hide();
        }
      }
    };
    getData();
  }, [appState]);

  const clearNotifications = useCallback(() => {
    console.log('Clearing all notifications');
    setTimeout(
      () =>
        setState((prevState) => {
          return {...prevState, ...{notifications: []}};
        }),
      0,
    );
  }, []);

  return (
    <SafeAreaView>
      <ErrorBoundary>
        <Notifications
          state={state !== null ? state.notifications : []}
          clearNotifications={clearNotifications}
        />
        {state !== null ? (
          <Main
            deviceName={appState.deviceName}
            mqttClient={mqttClient}
            state={state}
          />
        ) : (
          <Regististration updateAppState={setAppState} />
        )}
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
