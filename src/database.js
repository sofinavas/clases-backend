import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://sofianavasd:sofianavasd@cluster0.zdkrisu.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Conectados aa la BD"))
  .catch((error) => console.log("calma que estamos aprendiendo", error));
