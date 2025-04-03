import express from "express";
import { createConnection } from "typeorm";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
app.use(cors());
// Middleware per il parsing del body
app.use(express.json());

// Inizializza la connessione al database
createConnection()
  .then(() => {
    console.log("Connessione al database stabilita");

    // Collega le rotte
    app.use("/users", userRoutes);

    // Avvia il server
    app.listen(3000, () => {
      console.log("Server in ascolto sulla porta 3000");
    });
  })
  .catch((error) => {
    console.log("Errore durante la connessione al database:", error);
  });
