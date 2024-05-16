import express from "express";
const router = express.Router();
import UserModel from "../models/usuario.model.js";
import { createHash } from "../utils/hashBcrypt.js";
import passport from "passport";

// router.post("/", async (req, res) => {
//   const { first_name, last_name, email, password, age } = req.body;

//   try {
//     const existeUsuario = await UserModel.findOne({ email: email });
//     if (existeUsuario) {
//       return res.status(400).send("El correo ya esta registrado");
//     }
//     const nuevoUsuario = await UserModel.create({
//       first_name,
//       last_name,
//       email,
//       password: createHash(password),
//       age,
//     });

//     req.session.user = {
//       email: nuevoUsuario.email,
//       first_name: nuevoUsuario.first_name,
//     };
//     req.session.login = true;

//     res.status(200).send("Usario creado con Exitooooo");
//   } catch (error) {
//     res.status(500).send("Error al crear el usuario :(");
//   }
// });

//PASSPORT: (Estrategia local)
router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/failedregister",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).send("Credenciales invalidas");
    }
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    req.session.login = true;
    res.redirect("/profile");
  }
);

router.get("/failedregister", (req, res) => {
  res.send("Failed register");
});

export default router;
