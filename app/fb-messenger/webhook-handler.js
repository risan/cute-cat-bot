const EventEmitter = require('events');

class WebhookHandler extends EventEmitter {
  handle(req) {
    const data = req.body;

    if (data.object !== 'page') {
      return;
    }

    data.entry.forEach((pageEntry) => {
      pageEntry.messaging.forEach((event) => {
        if (event.message) {
          // When a message has been sent by your page.
          if (event.message.is_echo) {
            this.emit('messageEcho', event);
          } else {
            this.emit('message', event);
          }
        } else if (event.delivery) {
          // When a message a Page has sent has been delivered.
          this.emit('delivery', event);
        } else if (event.read) {
          // When a message a page has sent has been read by the user.
          this.emit('messageRead', event);
        } else if (event.account_linking) {
          // When the Link Account or Unlink Account button have been tapped.
          this.emit('accountLink', event);
        } else if (event.pass_thread_control) {
          // When thread ownership for a user has been passed to your
          // application.
          this.emit('handover', event);
        } else if (event.optin) {
          // When the send to Messenger plugin has been tapped, a user has
          // accepted a message request using customer matching, or a user has
          // opted in to receive messages via the checkbox plugin.
          this.emit('optin', event);
        } else if (event['policy-enforcement']) {
          // When a policy enforcement action is taken on the page it manages.
          this.emit('policyEnforcement', event);
        } else if (event.postback) {
          // When a postback button, Get Started button, or persistent menu
          // item is tapped.
          this.emit('postback', event);
        } else if (event.referral) {
          // When the user already has a thread with the bot and user comes to
          // the thread from referral.
          this.emit('referral', event);
        } else {
          // Other unknown types.
          this.emit('unknownType', event);
        }
      });
    });
  }
}

module.exports = WebhookHandler;
