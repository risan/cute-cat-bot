# Cute Cat Bot

A Facebook Messenger bot that will reply your chat with a cute cat GIF. Try it [here](https://m.me/CuteCatBot)!

![Cute Cat Bot](https://media.giphy.com/media/3o6nUZsdAI5o2DevKw/giphy.gif)

## Requirements
The following items are required to run this application sample:
* [Node.js](https://nodejs.org) version 7.6 or higher
* [Ngrok](https://ngrok.com) for testing locally
* [Facebook App](https://developers.facebook.com/apps) for your chat bot
* [Facebook Page](https://www.facebook.com/bookmarks/pages) that will be the face of your Messenger app

## Installation

This project is available on Glitch: [glitch.com/~three-conifer](https://glitch.com/~three-conifer).

### 1. Clone this repository
First, clone this repository to your local computer:

```bash
git clone git@github.com:risan/cute-cat-bot.git
```

### 2. Install the dependencies
Next, `CD` to the project directory and install all of the dependencies:

```bash
# Go to the project directory
cd cute-cat-bot

# Install all of the dependencies
npm install
```

### 3. Setting up environment variables
The next step is to configure your environment variables to run the application.

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Open up the `.env` file then set each directives properly.

```js
// .env
PORT=3000
FB_API_VERSION=2.11
FB_APP_SECRET=YOUR_APP_SECRET
FB_VERIFY_TOKEN=YOUR_MESSENGER_VERIFY_TOKEN
FB_PAGE_ACCESS_TOKEN=YOUR_FACE_BOOK_PAGE_ACCESS
GIPHY_API_KEY=YOUR_GIPHY_API_KEY
```

Heads up to the [Facebook App](https://developers.facebook.com/apps) page and select your application. Make sure that **Messenger** is added to your product. If not, click on the **Add Product** button an select the **Messenger**.

* `FB_APP_SECRET`: You'll find your app secret withi the **Dashboard** page of your application
* `FB_VERIFY_TOKEN`: Fill this with some random string, you'll use this to verify the webhook
* `FB_PAGE_ACCESS_TOKEN`: Go to the **Messenger** > **Settings** menu. Find the **Token Generation** section and select your Facebook page that you want to use.
* `GIPHY_API_KEY`: Heads up [here](https://developers.giphy.com/dashboard/?create=true) to create a new app and get your Giphy API key

### 4. Run the application 🎉

Run the application by typing the following command:

```bash
npm run start
```

Then expose the running application with [Ngrok](https://ngrok.com) by running:

```bash
ngrok http PORT_NUMBER
```

Replace the `PORT_NUMBER` with the one that you set within the `.env` file. You'll get the following output from Ngrok:

```
Forwarding  http://foobar123.ngrok.io -> localhost:3000
Forwarding  https://foobar123.ngrok.io -> localhost:3000
```

Head back to the [Facebook App](https://developers.facebook.com/apps) page and select your application. Go to the **Messenger** > **Settings** menu. Find the **Webhook** section and click on the **Setup Webhook** button. Check the **messages** subscription field and set:

```
Callback URL: https://foobar123.ngrok.io/webhook
Verify Token: FB_VERIFY_TOKEN from your .env file
```

Click the **Verify and Save** button. And once it's verified, you're good to go to test the chat bot 🎉

If you want to change your webhook URL later, head back to the [Facebook App](https://developers.facebook.com/apps) and select your application. You'll find a **Webhook** menu under the products now. Open it and click on the **Edit Subscription** button. You can reconfigure the URL and the verification token.
