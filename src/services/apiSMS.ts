import axios from 'axios';

export const tokenSMS = 'RewG-dyfFONfJS_ksULbe-koHBQlxGoZjwPl';

const apiSMS = axios.create({
  baseURL: 'https://api.zenvia.com/v2/channels/sms',
  timeout: 10000,
  headers: {
    'X-API-TOKEN': 'RewG-dyfFONfJS_ksULbe-koHBQlxGoZjwPl',
    'Content-Type': 'application/json',
  },
});

export default apiSMS;
