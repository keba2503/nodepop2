'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('open', () => {
  console.log('Conectado a MongoDB con', conn.name);
});

conn.on('error', err => {
  console.error('Error de conexión', err);
  process.exit(1);
});

mongoose.connect('mongodb://localhost/wallaclone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

module.exports = conn;



