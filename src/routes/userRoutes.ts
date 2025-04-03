  import express, { Request, Response } from "express";
  import { getRepository } from "typeorm";
  import { User } from "../entity/User";
  import { isAuthenticated } from "../middleware/authentication";


  const router = express.Router();

  router.get("/", async (req, res) => {
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
  });




  router.post("/", async (req, res) => {
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
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const { id } = req.params;

    try {
      const deleteResult = await userRepository
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: Number(id) })
        .execute();

      if (deleteResult.affected === 0) {
        return res.status(404).json({ message: "Utente non trovato" });
      }

      res.status(200).json({ message: "Utente eliminato con successo" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Errore sconosciuto");
      }
    }
  });
  export default router;
