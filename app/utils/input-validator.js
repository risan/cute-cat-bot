class InputValidator {
  constructor(matchedWords) {
    this.matchedWords = matchedWords;
  }

  isValid(text) {
    if (typeof text !== 'string') {
      return false;
    }
    
    const cleanText = this.cleanupText(text);

    const totalMatched = cleanText.split(' ').reduce((totalMatched, word) => {
      if (this.matchedWords.includes(word)) {
        totalMatched++;
      }

      return totalMatched;
    }, 0);

    return totalMatched > 0;
  }

  cleanupText(text) {
    return text.replace(/[^a-zA-Z0-9]/g, ' ').trim().toLowerCase();
  }
}

module.exports = InputValidator;
