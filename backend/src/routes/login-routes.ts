import express, { Router } from "express";
import { postLogin, postSignup } from "../controllers/loginControllers";
const router: Router = express.Router();

router.get("/", (req,res) => {
    console.log("You're in login router");
})

router.post("/sign-in", postLogin);

router.post("/sign-up", postSignup);

export default router;
