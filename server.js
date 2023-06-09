import express from "express";
require("dotenv").config();
import cors from "cors";
import initRouter from "./src/routes";
import connectDb from "./src/config/connectDatabase";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRouter(app)
connectDb()

const port = process.env.PORT || 8888
const listener = app.listen(port, () => {
    console.log(`Sever is running on port ${listener.address().port}`)
})