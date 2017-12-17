class InputValidator {
  constructor(targetWords) {
    this.targetWords = targetWords;
  }

  isValid(text) {
    if (typeof text !== 'string') {
      return false;
    }

    const cleanText = InputValidator.cleanupText(text);

    const matchedWords = cleanText
      .split(' ')
      .filter(word => this.targetWords.includes(word));

    return matchedWords > 0;
  }

  static cleanupText(text) {
    return text
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .trim()
      .toLowerCase();
  }
}

module.exports = InputValidator;
