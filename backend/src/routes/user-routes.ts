import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// router.use(async (req, res, next) => {
//   if (!res.locals.loggedIn) {
//     console.log("Not logged in");

//     res.redirect("/art");
//   } else {
//     console.log("Logged in");
//   }
//   next();
// });

router.get("/", (req, res) => {
  console.log("You're in user router");
});

export default router;
