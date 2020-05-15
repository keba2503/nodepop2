'use strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

main().catch( err => console.log('Hubo un error:', err));

async function main() {
  // conectar al servidor AMQP
  const conn = await connectionPromise;

  // conectar a un canal
  const channel = await conn.createChannel();

  // asegurar que tenemos una cola
  await channel.assertQueue(queueName, {});

  // cuantos mensajes quiero procesar en paralelo
  channel.prefetch(1);

  // nos suscribimos a una cola
  channel.consume(queueName, msg => {
    // hago el trabajo que corresponda a este worker
    console.log(msg.content.toString());
    // setTimeout(() => {
      // y cuando haya terminado
      channel.ack(msg); // ya he procesado el mensaje, lo confirmo para que se borre
    // }, 1);
  });

}