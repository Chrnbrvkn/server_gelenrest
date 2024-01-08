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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});


const corsOptions = {
  origin: 'https://gelenrest.ru',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api', router)

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.gelenrest.ru/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.gelenrest.ru/fullchain.pem', 'utf8');
// const ca = fs.readFileSync('./ssl/chain.pem', 'utf8');

const credentials = {
  key: privateKey,
  cert: certificate,
  // ca: ca
};

const httpsServer = https.createServer(credentials, app);
const start = async () => {
  try {
    // await sequelize.authenticate()
    // await sequelize.sync({ force: true })
    httpsServer.listen(PORT, () => {
      console.log(`Server is running on https://api.gelenrest.ru:${PORT}`);
    });

  } catch (e) {
    console.log(e);
  }
}

start()