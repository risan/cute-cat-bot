const axios = require('axios');

class Giphy {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  random({ tag, rating='G' }) {
    const params = tag ? { api_key: this.apiKey, tag, rating } : { api_key: this.apiKey, rating};

    return new Promise((resolve, reject) => {
      axios.get('https://api.giphy.com/v1/gifs/random', {params}).then(response => {
        resolve(response.data);
      }).catch(error => {
        if (error.response) {
          const { message, type, code } = error.response.data.error;
          reject(new Error(`Failed calling send API: [${code}][${type}] ${message}`));
        } else if (error.request) {
          reject(new Error('Failed calling Giphy random API, no response was received.'));
        } else {
          reject(error);
        }
      });
    });
  }
}

module.exports = Giphy;
