import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import './database/connect';
import routes from './routes';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// setup express app here
app.use(routes);

// start express server
app.listen(process.env.PORT, () => {
  console.log(`Express server has started on port ${process.env.PORT}.`);
  console.log(
    `${process.env.TYPEORM_HOST} - ${process.env.TYPEORM_DATABASE}-${process.env.TYPEORM_USERNAME}- ${process.env.TYPEORM_PASSWORD}.`,
  );
});
