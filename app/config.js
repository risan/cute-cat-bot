require('dotenv').config();

const config = {
  port: (process.env.PORT ? parseInt(process.env.PORT, 10) : undefined) || 4000,
  facebook: {
    apiVersion: process.env.FB_API_VERSION || '2.11',
    appSecret: process.env.FB_APP_SECRET,
    verifyToken: process.env.FB_VERIFY_TOKEN,
    pageAccessToken: process.env.FB_PAGE_ACCESS_TOKEN,
  },
  giphy: {
    apiKey: process.env.GIPHY_API_KEY,
  },
};

module.exports = config;
