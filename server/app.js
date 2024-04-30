import express, { urlencoded } from "express";
import apiRoute from "./route.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = 8000;
const URL = process.env.DB_URL;

//Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/todo", apiRoute);

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(URL)
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`App listening at port 8000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
