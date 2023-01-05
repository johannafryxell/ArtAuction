import express, { Application, Request, Response } from "express";
import AuctionRoute from "./routes/art-routes";
import LoginRoute from "./routes/login-routes";
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").config();

require("../services/database.ts");

const app: Application = express();
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: Function) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

const port: number = 3001;

app.get("/", async (req, res) => {
  res.send({
    msg: "Hello World!",
  });
});

app.use("/art", AuctionRoute);
app.use("/login", LoginRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
