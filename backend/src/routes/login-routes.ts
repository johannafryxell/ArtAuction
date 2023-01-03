import express, { Router} from "express";
import { postLogin, postSignup } from "../controllers/loginControllers";

const router: Router = express.Router();

//Gets all auctions from database
router.post("/sign-in", postLogin);

router.post("/sign-up", postSignup);

export default router;