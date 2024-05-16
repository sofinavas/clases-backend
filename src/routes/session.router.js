import express from "express";
const router = express.Router();
// import UserModel from "../models/usuario.model.js";
// import { isValidPassword } from "../utils/hashBcrypt.js";
import passport from "passport";

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const usuario = await UserModel.findOne({ email: email });
//     if (usuario) {
//       //if (usuario.password === password) {
//       if (isValidPassword(password, usuario)) {
//         req.session.login = true;
//         req.session.user = {
//           email: usuario.email,
//           first_name: usuario.first_name,
//         };
//         res.redirect("/profile");
//       } else {
//         res.status(401).send("Contraseña no válida");
//       }
//     } else {
//       res.status(404).send("Usuario no encontrado");
//     }
//   } catch (error) {
//     res.status(400).send("Error en el login");
//   }
// });

//Logout

router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/login");
});

//PASSPORT
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/failedlogin",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(400).send("Credenciales inválidas");
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
router.get("/failedlogin", async (req, res) => {
  res.send("Error en el login");
});

//GITHUB:

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  async (req, res) => {
    //La estrategia de github me retorna los datos del usuario por lo que los debo agregar a la sesssion:
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/profile");
  }
);

export default router;
