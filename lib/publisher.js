'use strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

main().catch( err => console.log('error:', err));

async function main() {

  const conn = await connectionPromise;


  const channel = await conn.createChannel();

  // asegurar que tenemos una cola
  await channel.assertQueue(queueName, {
    durable: true, // la cola sobrevice a reinicios del broker
  });

    const mensaje =  {
      texto: 'tarea ' + Date.now(),
    }


    // enviar un trabajo a la cola (mandar un mensaje)
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(mensaje)), {
      persistent: true
    });

    console.log('publicado el mensaje', mensaje.texto);
   }

