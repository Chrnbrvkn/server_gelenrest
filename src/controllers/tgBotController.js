require('dotenv/config');
const axios = require('axios');

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;


const sendToTelegramBot = async (message) => {
  try {
    await axios.post(telegramUrl, {
      chat_id: chatId,
      text: message,
    });
    console.log('Message sent to Telegram Bot successfully');
  } catch (error) {
    console.error('Error in sending message to Telegram Bot', error.message);
  }
};

const sendModalCallback = async (req, res) => {
  try {
    const { message } = req.body;
    await sendToTelegramBot(message);
    res.status(200).send('Message sent to Telegram Bot successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in sending message to Telegram Bot');
  }
};


module.exports = { sendModalCallback, sendToTelegramBot };