import { Request, Response, Router } from 'express';

import MusicianController from './controller/MusicianController';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Bem vindo a StaysicApi ' });
});

routes.post('/musician', MusicianController.create);
routes.get('/musician', MusicianController.list);
routes.patch('/musician/:id', MusicianController.update);
routes.delete('/musician/:id', MusicianController.delete);

export default routes;
