class WebhookValidator {
  constructor(verifyToken) {
    this.verifyToken = verifyToken;
  }

  validate(req) {
    if (!this.isValidRequest(req)) {
      throw new Error(
        'Failed validation, the verification token did not match.'
      );
    }

    return WebhookValidator.extractChallenge(req);
  }

  isValidRequest(req) {
    return (
      req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === this.verifyToken
    );
  }

  static extractChallenge(req) {
    return req.query['hub.challenge'];
  }
}

module.exports = WebhookValidator;
