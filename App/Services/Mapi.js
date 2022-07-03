import apisauce from 'apisauce';

const create = (baseURL = 'https://m.cevadesign.ro/dex/api/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  });

  const saveToken = (token, notify, deviceId) => api.put('/saveToken', { token, notify, deviceId });

  return {
    saveToken,
  };
};

export default { create };
