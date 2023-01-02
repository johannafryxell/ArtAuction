import express, { Router} from "express";
import { postLogin } from "../controllers/loginControllers";

const router: Router = express.Router();

//Gets all auctions from database
router.post("/login/sign-in", postLogin);

export default router;