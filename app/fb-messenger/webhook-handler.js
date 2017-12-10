const doNothing = () => {};

class WebhookHandler {
  handle(req, {onReceivedMessage = doNothing} = {}) {
    const data = req.body;

    if (data.object !== 'page') {
      return;
    }

    data.entry.forEach(pageEntry => {
      pageEntry.messaging.forEach(messagingEvent => {
        if (messagingEvent.message) {
          onReceivedMessage(messagingEvent);
        }
      });
    });
  }
}

module.exports = WebhookHandler;
