import express from "express";
import { createConnection } from "typeorm";
import userRoutes from "./routes/userRoutes";
import cors from "cors"; // Assicurati sia importato
import Loginrouter, { authenticateToken } from "./routes/authRoutes";
import session from 'express-session';
import authRouter from "./routes/authRoutes";
import bodyParser from "body-parser";
import cookieparser from 'cookie-parser';

const app = express();

// --- CONFIGURAZIONE CORS CORRETTA ---
const corsOptions = {
  origin: 'http://localhost:4200', // <-- METTI QUI L'URL ESATTO DEL TUO FRONTEND ANGULAR
  credentials: true, // <-- FONDAMENTALE: Permette al browser di inviare/ricevere cookie
  optionsSuccessStatus: 200 // Necessario per alcuni browser/versioni
};
app.use(cors(corsOptions)); // Usa le opzioni configurate

// Middleware per il parsing del body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieparser())

// Inizializza la connessione al database
createConnection()
  .then(() => {
    console.log("Connessione al database stabilita");

    // Collega le rotte (authO session e cors)
    app.use("/api/users", authenticateToken, userRoutes); // Assicurati che queste non necessitino session prima del login
    app.use("/auth", authRouter); // Qui ci saranno /login, /logout, /status

    // Avvia il server
    app.listen(3000, () => {
      console.log("Server in ascolto sulla porta 3000");
       if (process.env.NODE_ENV !== 'production') {
          console.warn('ATTENZIONE: Cookie NON impostato su secure=true (solo per sviluppo)');
       }
    });
  })
  .catch((error) => {
    console.log("Errore durante la connessione al database:", error);
  });