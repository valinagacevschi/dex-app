import apisauce from 'apisauce';

// our "constructor"
const create = (baseURL = 'https://dexonline.ro/') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  });

  const wordOfDay = (date) => api.get(`cuvantul-zilei/${date}`);
  const wordOfMonth = (date) => api.get(`cuvantul-lunii/${date}`);

  const getWords = (word) => api.get(`definitie/${word}*`);  
  const getDefinition = (word) => api.get(`definitie/${word}/json`);

  return {
    wordOfDay,
    wordOfMonth,
    getWords,
    getDefinition,
  };
};

export default { create };
