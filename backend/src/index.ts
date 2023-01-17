import express, { Application, Request, Response } from "express";
import AuctionRoute from "./routes/auction-routes";
import LoginRoute from "./routes/login-routes";
import UserRoute from "./routes/user-routes";
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const path = require("path");


const jwt = require("jsonwebtoken");
require("dotenv").config();

require("../services/database.ts");

const app: Application = express();

// app.use(express.static(path.join(__dirname, "..", "build")));
// app.use(express.static("public"));
// app.use(
//   session({
//     secret: process.env.JWT_SECRET,
//     resave: true,
//     saveUninitialized: true,
//   })
// );
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

/*
 * Middleware to check if logged in.
 */
app.use((req, res, next) => {  
  const { logIn } = req.cookies;
  
  if (logIn && jwt.verify(logIn, process.env.JWT_SECRET)) {
    const tokenData = jwt.decode(logIn, process.env.JWT_SECRET);
    res.locals.loggedIn = true;
    res.locals.email = tokenData.email;
    res.locals.id = tokenData.id;
    console.log(res.locals);
    
  } else {
    res.locals.loggedIn = false;
    
  }
  // console.log(res.locals.loggedIn);
  
  next();
});

const port: number = 3001;

app.get("/", async (req, res) => {
  // res.sendFile(path.join(__dirname, "public", "index.tsx"));

  res.send({
    msg: "Hello World!",
  });
});

app.use("/auction", AuctionRoute);
app.use("/login", LoginRoute);
app.use("/account", UserRoute);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
