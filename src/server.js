require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const router = require('./routes');
const cors = require('cors')
const path = require('path')
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT || 8080
const app = express()

app.use('/public/uploads', express.static('public/uploads'));

app.use(cors({
  origin: 'https://www.gelenrest.ru',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public_html')));

app.use(express.json())
app.use('/api', router)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.gelenrest.ru/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.gelenrest.ru/fullchain.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.gelenrest.ru/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
};

const httpsServer = https.createServer(credentials, app);
const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    httpsServer.listen(PORT, () => {
      console.log(`Server is running on https://gelenrest.ru:${PORT}`);
    });

  } catch (e) {
    console.log(e);
  }
}

start()