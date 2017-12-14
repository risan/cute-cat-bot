const config = require('./config');
const Messenger = require('./fb-messenger/messenger');

class Reply {
  constructor() {
    this.messenger = new Messenger({ pageAccessToken: config.facebook.pageAccessToken, apiVersion: config.facebook.apiVersion });
  }

  sendRandomCatGif(recipientId) {
    this.messenger.sendImage(recipientId, 'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif')
      .then(res => {})
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
