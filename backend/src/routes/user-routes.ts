import express, { Router } from "express";
import { getAccount, getUserAuctions } from "../controllers/accountControllers";

const router: Router = express.Router();

//Denna ska inte vara en post
router.post("/", (getAccount));

router.get("/getuserauctions", (getUserAuctions));

export default router;
