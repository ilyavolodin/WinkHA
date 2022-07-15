import {
  createConnection,
  createLongLivedTokenAuth,
} from 'home-assistant-js-websocket';

async function connect(host) {
  const auth = createLongLivedTokenAuth(
    'http://homeassistant.home:8123',
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkMzA2YTZiN2ZmZTU0NGM4YWQzYmI1ZmNiZTY1OTIwNSIsImlhdCI6MTY1NzkyMDU0OCwiZXhwIjoxOTczMjgwNTQ4fQ.0nZRbs5D1Oj2iQJ3GwfTo_NTz9UDqmcln-bnHFtuWIc',
  );

  return createConnection({auth});
}

export async function establishConnection(host) {
  return connect(host);
}
