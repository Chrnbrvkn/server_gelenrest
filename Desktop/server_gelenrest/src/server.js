require('dotenv').config()
const express = require('express');
const sequelize = require('./db');
const router = require('./routes');
const cors = require('cors')
const path = require('path')
const PORT = process.env.PORT || 8080
const app = express()

app.use('/public/uploads', express.static('public/uploads'));

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.static(path.join(__dirname, 'dist')));

app.use(express.json())
app.use('/api', router)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`Server start on PORT: ${PORT}`);
    })

  } catch (e) {
    console.log(e);
  }
}

start()