import express, { RequestHandler } from "express";
import { accediUtente, addUtente } from "../controller/utentiController";
import jwt from "jsonwebtoken";
import env from "../env";
const authRouter = express.Router();

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: "Token mancante" });

  try {
    res.locals["user"] = jwt.verify(token, env.jwtSecret);
    return next();
  } catch (err) {
    return res.status(403).json({ error: "Token non valido o scaduto" });
  }
};

// rotta che vuoi in frontend
authRouter.post("/register", addUtente);
authRouter.post("/login", accediUtente);
authRouter.post("/logout", (_, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout effettuato" });
});

authRouter.get("/me", authenticateToken, (req, res) => {
  res.status(200).json(res.locals["user"].user);
});
export default authRouter;
