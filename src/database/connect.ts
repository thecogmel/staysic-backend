import { createConnection } from 'typeorm';

createConnection()
  .then(() => console.log('Conectado ao banco!'))
  .catch(error => console.log(error));
