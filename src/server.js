require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const router = require('./routes');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/public/uploads', express.static('public/uploads'));

const allowedOrigins = ['https://gelenrest.ru','https://www.gelenrest.ru', 'https://192.168.0.103:5173', 'https://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log('Origin:', req.get('Origin'));
  next();
});

app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
