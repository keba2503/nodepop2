'use strict';

require('dotenv').config();

const conn = require('./lib/connectMongoose');
const Anuncios = require('./models/Anuncios');
const Users = require('./models/Users');

conn.once('open', async () => {
    try {
  
      await initAnuncios();
      await initUsers();
      conn.close();
  
    } catch(err) {
      console.error('error:', err);
      process.exit(1);
    }
  });

async function initAnuncios() {
    await Anuncios.deleteMany();
    await Anuncios.insertMany([
      {
        name: "Macbook",
        sale: true,
        price: 8000,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "mac.jpg"
      },

      {
        name: "Car",
        sale: false,
        price: 5000,
        tags: ["lifestyle", "motor"],
        imagen: "car.jpg"
      },

      {
        name: "Ipad",
        sale: false,
        price: 2500,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "ipad.jpg"
      },

      {
        name: "Echo Dot (3.ª generación)",
        sale: true,
        price: 35,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "echo.jpg"
      },
      {
        name: "Smarwathc",
        sale: true,
        price: 300,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "apple.jpg"
      },
      {
        name: "apple watch 3",
        sale: true,
        price: 200,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "apple.jpg"
      },
      {
        name: "apple watch 5",
        sale: true,
        price: 35,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "apple.jpg"
      },
      {
        name: "Alexa",
        sale: true,
        price: 30,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "alexa.jpg"
      },
      {
        name: "Bicicleta",
        sale: true,
        price: 300,
        tags: ["lifestyle", "mobile", "electronic"],
        imagen: "bici.jpg"
      },
      {
        name: "Iphone",
        sale: true,
        price: 1000,
        tags: [ "lifestyle", "mobile", "electronic"],
        imagen: "iphone.jpg"
    },

    ]);
  }

  async function initUsers() {
    await Users.deleteMany(); 
    await Users.insertMany([
      {
        email: 'user@example.es',
        password:  await Users.hashPassword('1234'),
      },
      {
        email: 'keba2503@gmail.com',
        password: await Users.hashPassword('1234'),
      }
    ]);
  }

