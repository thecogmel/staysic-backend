import { createConnection } from 'typeorm';

require('dotenv').config();

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

const extensionFile = process.env.NODE_ENV === 'development' ? 'ts' : 'js';

const config: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  entities: [rootDir + `/entities/*.${extensionFile}`],
  migrations: [rootDir + `/database/migrations/*.${extensionFile}`],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};

createConnection(config)
  .then(() => console.log('Conectado ao banco!'))
  .catch(error => console.log(error));
