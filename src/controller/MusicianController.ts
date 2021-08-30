import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Musician from '../entities/Musician';

class MusicianController {
  async create(request: Request, response: Response) {
    const musicianRepository = getRepository(Musician);

    const { name, email, number, instrument } = request.body;

    const musicianExists = await musicianRepository.findOne({
      where: { email },
    });

    if (musicianExists) {
      return response.status(409).send({ message: 'E-mail já existente' });
    }

    const musician = musicianRepository.create({
      name,
      email,
      number,
      instrument,
    });
    await musicianRepository.save(musician);

    return response.json(musician);
  }
  async list(request: Request, response: Response) {
    const musicianRepository = getRepository(Musician);

    const allMusician = await musicianRepository.find();

    if (allMusician) {
      return response.json(allMusician);
    }
  }

  async update(request: Request, response: Response) {
    const musicianRepository = getRepository(Musician);

    const { id } = request.params;

    const { email, name, instrument, number } = request.body;

    const musicianUpdate = await musicianRepository.findOne(id);

    if (!musicianUpdate) {
      return response
        .status(400)
        .send({ message: 'Usuário não existe para ser editado' });
    }
    musicianUpdate.email = email;
    musicianUpdate.name = name;
    musicianUpdate.instrument = instrument;
    musicianUpdate.number = number;

    await musicianRepository.save(musicianUpdate).then(async () => {
      return response.json(await musicianRepository.findOne(id));
    });
  }

  async delete(request: Request, response: Response) {
    const musicianRepository = getRepository(Musician);

    const { id } = request.params;

    const musicianRemove = await musicianRepository.findOne(id);

    if (!musicianRemove) {
      return response
        .status(400)
        .send({ message: 'Usuário não existe para ser deletado' });
    }
    await musicianRepository.remove(musicianRemove);
    return response.json({ message: 'Usuário deletado' });
  }
}

export default new MusicianController();
