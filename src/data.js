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
      const [state, deviceClass, attributes] = JSON.parse(msg.data);
      console.log(state, deviceClass, attributes);
      const item = {
        [itemName]: {
          ...state,
          ...deviceClass,
          attributes,
        },
      };
      setState((prevState) => {
        const oldState = prevState || [];
        const index = oldState.findIndex(
          (element) => Object.keys(element)[0] === itemName,
        );
        const stateClone = [...oldState];
        if (index >= 0) {
          stateClone[index] = item;
        } else {
          stateClone.push(item);
        }
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
        return sorted;
      });
    } else if (msg.topic === `WinkHA/${deviceName}/config`) {
      list = JSON.parse(msg.data);
    }
  });
  client.on('closed', () => console.log('connection closed'));
  client.connect();
  client.subscribe(`WinkHA/${deviceName}/#`, 0);
  return client;
};
