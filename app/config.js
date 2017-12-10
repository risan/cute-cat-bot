require('dotenv').config();

const config = {
  port: (process.env.PORT ? parseInt(process.env.PORT) : undefined) || 4000,
  facebook: {
    verifyToken: process.env.FB_VERIFY_TOKEN,
    pageAccessToken: process.env.FB_PAGE_ACCESS_TOKEN
  }
};

module.exports = config;
