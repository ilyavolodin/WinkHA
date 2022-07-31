import MQTT from 'sp-react-native-mqtt';

export const connect = async (setState, deviceName, mqttInfo) => {
  const client = await MQTT.createClient({
    uri: `mqtt://${mqttInfo.serverUrl}:${mqttInfo.serverPort}`,
    clientId: 'WinkHA',
    user: mqttInfo.username,
    pass: mqttInfo.password,
    auth: true,
  });

  let list = {};
  client.on('error', (msg) => console.log(`Error! ${msg}`));
  client.on('connect', () => console.log('connected!'));
  client.on('message', (msg) => {
    const parsedTopic = msg.topic.split('/');
    const itemName = parsedTopic[parsedTopic.length - 1];
    console.log(msg.topic, deviceName);
    if (msg.topic.startsWith(`WinkHA/${deviceName}/entities/`)) {
      const [state, deviceClass, attributes] =
        JSON.parse(msg.data || null) || [];
      console.log(state, deviceClass, attributes);
      const item = {
        [itemName]:
          state || deviceClass || attributes
            ? {
                ...state,
                ...deviceClass,
                attributes,
              }
            : null,
      };
      updateItemsState(item, setState, list);
    } else if (msg.topic === `WinkHA/${deviceName}/config`) {
      list = JSON.parse(msg.data);
      updateItemsState({}, setState, list);
    } else if (msg.topic === `WinkHA/${deviceName}/notifications`) {
      console.log('recieved notification');
      updateNotificationState([JSON.parse(msg.data) || {}], setState);
    }
  });
  client.on('closed', () => console.log('connection closed'));
  client.connect();
  client.subscribe(`WinkHA/${deviceName}/#`, 0);
  return client;
};

const updateItemsState = (state, setState, list) => {
  setState((prevState) => {
    const oldState = (prevState && prevState.components) || [];
    const stateClone = [...oldState];
    Object.keys(state).forEach((itemName) => {
      const index = oldState.findIndex(
        (element) => Object.keys(element)[0] === itemName,
      );
      if (index >= 0) {
        if (!state[itemName] || Object.keys(state[itemName]).length === 0) {
          stateClone.splice(index, 1);
        } else {
          stateClone[index] = {[itemName]: state[itemName]};
        }
      } else {
        stateClone.push({[itemName]: state[itemName]});
      }
    });
    const sorted = stateClone.sort((a, b) => {
      const i = Object.keys(a)[0];
      const j = Object.keys(b)[0];
      if (list) {
        if (list[i] === undefined || list[j] === undefined) {
          return 0;
        }
        if (list[i] > list[j]) {
          return 1;
        }
        if (list[i] < list[j]) {
          return -1;
        }
      }
      return 0;
    });
    return {...prevState, ...{components: sorted}};
  });
};

const updateNotificationState = (state, setState) => {
  setState((prevState) => ({
    ...prevState,
    ...{notifications: [...(prevState.notifications || []), ...state]},
  }));
};
