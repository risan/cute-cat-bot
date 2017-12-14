const config = require('./config');
const Messenger = require('./fb-messenger/messenger');
const Giphy = require('./giphy');

class Reply {
  constructor() {
    this.messenger = new Messenger({ pageAccessToken: config.facebook.pageAccessToken, apiVersion: config.facebook.apiVersion });
    this.giphy = new Giphy(config.giphy.apiKey);
  }

  sendRandomCatGif(recipientId) {
    this.giphy.random({ tag: 'cat' })
      .then(({ data: { fixed_width_downsampled_url: imageUrl } }) => {
        this.messenger.sendImage(recipientId, imageUrl)
          .then(res => {})
          .catch(e => console.error(e.message));
      })
      .catch(e => console.error(e.message));
  }

  sendForInvalidInput(recipientId) {
    this.messenger.sendQuickReply(recipientId, 'Cat does not understand your language 🐈', [
      {
        content_type: 'text',
        title: 'Meow',
        payload: 'MEOW_CLICKED',
      },
      {
        content_type: 'text',
        title: 'Pusss',
        payload: 'PUSSS_CLICKED',
      },
      {
        content_type: 'text',
        title: 'Purrr',
        payload: 'PURRR_CLICKED',
      },
      {
        content_type: 'text',
        title: 'Nyaaar',
        payload: 'NYAAAR_CLICKED',
      }])
      .then(res => {})
      .catch(e => console.error(e.message));
  }
}

module.exports = Reply;
