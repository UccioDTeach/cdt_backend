import express, { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Certificato } from "../entity/modelloCertificato";

const Certrouter = express.Router();

Certrouter.get("/", async (req, res) => {
  const certsRepository = getRepository(Certificato);
  try {
    const certs = await certsRepository.find({
      where: { createdBy: { id: req.session.user?.id ?? -1 } },
    });
    res.json(certs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
});

Certrouter.put("/:id", async (req: Request, res: Response) => {
  const certsRepository = getRepository(Certificato);
  const { id } = req.params;

  try {
    const cert = await certsRepository.findOne({
      where: { id: Number(id) },
    });

    if (!cert) {
      return res.status(404).json({ message: "Certificato non trovato" });
    }

    certsRepository.merge(cert, req.body);
    const updatedCert = await certsRepository.save(cert);

    res.status(200).json({
      message: "Certificato aggiornato con successo",
      cert: updatedCert,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
});

Certrouter.post("/", async (req, res) => {
  const certsRepository = getRepository(Certificato);
  try {
    console.log("Certificato creato con successo:", req.body);
    const cert = certsRepository.create(req.body);
    const results = await certsRepository.save(cert);
    res.status(201).json(results);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
});

Certrouter.delete("/:id", async (req: Request, res: Response) => {
  const certsRepository = getRepository(Certificato);
  const { id } = req.params;

  try {
    const deleteResult = await certsRepository
      .createQueryBuilder()
      .delete()
      .from(Certificato)
      .where("id = :id", { id: Number(id) })
      .execute();

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: "Certificato non trovato" });
    }

    res.status(200).json({ message: "Certificato eliminato con successo" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("Errore sconosciuto");
    }
  }
});
export default Certrouter;
