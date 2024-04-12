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
  } catch (e) {
    console.error('Error in sending message to Telegram Bot', e.message);
    return res.status(500).json({ error: e.message });

  }
};

const sendModalCallback = async (req, res) => {
  try {
    const { message } = req.body;
    await sendToTelegramBot(message);
    return res.status(200).send('Message sent to Telegram Bot successfully');
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
};


module.exports = { sendModalCallback, sendToTelegramBot };