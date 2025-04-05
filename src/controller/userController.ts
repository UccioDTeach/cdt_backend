import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

// Ottieni tutti gli utenti
export const getUsers = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
};

export const addUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    res.status(201).json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
};

// Elimina un utente
export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const results = await userRepository.delete(req.params.id);
    if (results.affected === 0) {
      return res.status(404).send("Utente non trovato");
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      return res.status(400).send("ID non valido");
    }

    // Usa FindOneOptions con la clausola where
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).send("Utente non trovato");
    }

    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    res.json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
};
