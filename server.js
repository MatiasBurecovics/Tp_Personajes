import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/personajeController.js";
import passport from "passport";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/personaje", PersonajeRouter);

passport.use(jwtStrategy);
app.use(passport.initialize());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
