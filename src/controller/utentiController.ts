import { Request, Response } from "express";
import { Utenti } from "../entity/utente";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import env from "../env";


declare module "express-session" {
  interface SessionData {
    userId: number;
    email?: string;
    isLoggedIn?: boolean;
  }
}


export const getUtenti = async (req: Request, res: Response) => {
  const userRepository = getRepository(Utenti);
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


export const addUtente = async (req: Request, res: Response) => {
  const userRepository = getRepository(Utenti);
  try {
    const user = userRepository.create(req.body);
    const results = await userRepository.save(user);
    const token = jwt.sign({user:results}, env.jwtSecret, { expiresIn: "7d" });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict', 
    });
    res.status(201).json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
};



export const accediUtente = async (req: Request, res: Response) => {
  const userRepository = getRepository(Utenti);
  try{
    const { email, password } = req.body
    const user = await userRepository.findOne({ where: { email: email, password: password } });
    if (!user) {
      return res.status(401).json({ message: "Utente non trovato" }); 
    }
    const token = jwt.sign({user}, env.jwtSecret, { expiresIn: "7d" });
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'strict', 
    });
    res.status(200).json(user)
  }catch(err){
    if(err instanceof Error){
      res.status(500).send(err.message)
    } 
  }
}
