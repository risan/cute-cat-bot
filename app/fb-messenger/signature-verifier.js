const crypto = require('crypto');

class SignatureVerifier {
  constructor(appSecret) {
    this.appSecret = appSecret;
    this.verify = this.verify.bind(this);
  }

  verify(req, res, buf) {
    const signature = req.headers['x-hub-signature'];

    if (!signature) {
      throw new Error('No signature found on the request');
    }

    const [, signatureHash] = signature.split('=');

    const expectedHash = this.hash(buf);

    if (signatureHash !== expectedHash) {
      throw new Error('Invalid request signature.');
    }
  }

  hash(data) {
    return crypto.createHmac('sha1', this.appSecret)
      .update(data)
      .digest('hex');
  }
}

module.exports = SignatureVerifier;
