import express from "express";
import authRoutes from "./routes/auth.js";
import gameDataRoutes from "./routes/gameDataRoutes.js";

import connectMongo from "./config/mongo.js";
const app = express();

connectMongo()
  .then(() => {
    app.set("view engine", "ejs");

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.send("hello from the backend");
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/user/game-data", gameDataRoutes);

    app.listen(5000, console.log("App Running on http://localhost:5000"));
  })
  .catch(console.error);
