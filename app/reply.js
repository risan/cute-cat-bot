const config = require('./config');
const MessengerClient = require('messenger-client');
const GiphyRandom = require('giphy-random');

class Reply {
  constructor() {
    this.messengerClient = new MessengerClient({
      pageAccessToken: config.facebook.pageAccessToken,
      apiVersion: config.facebook.apiVersion
    });

    this.giphyRandom = new GiphyRandom({ apiKey: config.giphy.apiKey });
  }

  async sendRandomCatGif(recipientId) {
    try {
      const data = await this.giphyRandom.get({ tag: 'cat' });

      return await this.messengerClient.sendImage({
        recipientId,
        url: data.fixed_width_downsampled_url
      });
    } catch (e) {
      console.error(e.message);
    }

    return null;
  }

  sendForInvalidInput(recipientId) {
    this.messengerClient
      .sendQuickReplies({
        recipientId,
        text: 'Cat does not understand your language 🐈',
        replies: [
          {
            content_type: 'text',
            title: 'Meow',
            payload: 'MEOW_CLICKED'
          },
          {
            content_type: 'text',
            title: 'Pusss',
            payload: 'PUSSS_CLICKED'
          },
          {
            content_type: 'text',
            title: 'Purrr',
            payload: 'PURRR_CLICKED'
          },
          {
            content_type: 'text',
            title: 'Nyaaar',
            payload: 'NYAAAR_CLICKED'
          }
        ]
      })
      .then(() => {})
      .catch(e => console.error(e.message));
  }
}

module.exports = Reply;
