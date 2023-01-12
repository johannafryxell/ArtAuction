import express, { Router, Request, Response } from "express";
import { getAccount, getUserAuctions } from "../controllers/accountControllers";

const router: Router = express.Router();

// router.use(async (req, res, next) => {
//   if (!res.locals.loggedIn) {
//     console.log("Not logged in");

//     // res.redirect("/");
//   } else {
//     console.log("Logged in");
//   }
//   next();
// });

//Denna ska inte vara en post
router.post("/", (getAccount));

router.get("/getuserauctions", (getUserAuctions));

export default router;
