import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/user.router.js";
import sessionsRouter from "./routes/session.router.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import "./database.js";

// http://localhost:8080/api/sessions/githubcallback

// App ID: 899075

// Client ID: Iv23liGXYtmbZnDPzI32

// Cliente Secreto: 62b6f9fe667ae5476ec65a58d685ae3f4bfd910c
const app = express();
const PUERTO = 8080;

//Express-handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://sofianavasd:sofianavasd@cluster0.zdkrisu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
      ttl: 100,
    }),
  })
);

//Passport:
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//Rutas:

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);

app.listen(PUERTO, () => {
  console.log("Escuchando en el puerto espero que todo vaya bien");
});
