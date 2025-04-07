import express, { Request, Response } from "express";
import { getRepository, getConnection } from "typeorm";
import { User } from "../entity/User";

const router = express.Router();

router.get("/", async (req, res) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find({
      where: { createdBy: { id: req.session.user?.id ?? -1 } },
    });
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { id } = req.params;

  try {
    const user = await userRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);

    res.status(200).json({
      message: "Utente aggiornato con successo",
      user: updatedUser,
    });
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
    console.log("Utente creato con successo:", req.body);
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
  const { id } = req.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "ID utente non valido" });
  }

  const connection = getConnection();
  const queryRunner = connection.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userRepository = queryRunner.manager.getRepository(User);

    // Step 1: Update dependent users' createdById to NULL
    await userRepository.update({ createdById: userId }, { createdById: null });

    // Step 2: Delete the target user
    const deleteResult = await userRepository.delete(userId);

    if (deleteResult.affected === 0) {
      await queryRunner.rollbackTransaction();
      return res.status(404).json({ message: "Utente non trovato" });
    }

    // Commit the transaction
    await queryRunner.commitTransaction();
    res.status(200).json({ message: "Utente eliminato con successo" });
  } catch (error) {
    // Rollback transaction in case of errors
    await queryRunner.rollbackTransaction();

    console.error("Errore durante l'eliminazione dell'utente:", error);
    if (error instanceof Error) {
      // Check if it's the specific foreign key constraint error
      if (error.message.includes('FK_45c0d39d1f9ceeb56942db93cc5')) {
        res.status(400).json({ message: "Impossibile eliminare l'utente: è referenziato da altri utenti." });
      } else {
        res.status(500).send(error.message);
      }
    } else {
      res.status(500).send("Errore sconosciuto durante l'eliminazione");
    }
  } finally {
    // Release the query runner
    await queryRunner.release();
  }
});

export default router;
