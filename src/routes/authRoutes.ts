import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { accediUtente, addUtente } from "../controller/utentiController";
import env from "../env";
const authRouter = express.Router();

export const authenticateToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ error: "Token mancante" });

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    if (!decoded) return res.status(403).json({ error: "Token non valido" });
    if (typeof decoded === "object" && "user" in decoded) {
      req.session["user"] = decoded["user"];
    } else {
      return res.status(403).json({ error: "Token non valido" });
    }
    return next();
  } catch (err) {
    return res.status(403).json({ error: "Token non valido o scaduto" });
  }
};

authRouter.post("/register", addUtente);
authRouter.post("/login", accediUtente);
authRouter.post("/logout", (_, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout effettuato" });
});

authRouter.get("/me", authenticateToken, (req, res) => {
  res.status(200).json(req.session["user"]);
});
export default authRouter;
