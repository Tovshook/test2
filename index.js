require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB-д холбогдлоо'))
  .catch(err => console.error('❌ Mongo холболтын алдаа:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер http://localhost:${PORT} дээр ажиллаж байна`));
