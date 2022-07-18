import MQTT from 'sp-react-native-mqtt';

export const connect = async (setState) => {
  const client = await MQTT.createClient({
    uri: 'mqtt://homeassistant.home:1883',
    clientId: 'WinkHA',
    user: 'mqttuser',
    pass: 'MQTT365Conant',
    auth: true,
  });

  let list = {};
  client.on('error', (msg) => console.log(`Error! ${msg}`));
  client.on('connect', () => console.log('connected!'));
  client.on('message', (msg) => {
    const parsedTopic = msg.topic.split('/');
    const itemName = parsedTopic[parsedTopic.length - 1];
    const deviceName = parsedTopic[parsedTopic.length - 2];
    if (parsedTopic[0] === 'WinkHA' && itemName !== 'list') {
      const [state, deviceClass, attributes] = JSON.parse(msg.data);
      const item = {
        [itemName]: {
          ...state,
          ...deviceClass,
          attributes,
        },
      };
      setState((prevState) => {
        const index = prevState.findIndex(
          (element) => Object.keys(element)[0] === itemName,
        );
        const stateClone = [...prevState];
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
    } else if (itemName === 'list') {
      list = JSON.parse(msg.data);
    }
  });
  client.on('closed', () => console.log('connection closed'));
  client.connect();
  client.subscribe('WinkHA/LivingRoom/+', 0);
  return client;
};
