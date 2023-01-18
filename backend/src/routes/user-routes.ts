import express, { Router } from "express";
import { getAccount, getUserAuctions } from "../controllers/accountControllers";

const router: Router = express.Router();

router.get("/", (getAccount));

router.get("/getuserauctions", (getUserAuctions));

export default router;
