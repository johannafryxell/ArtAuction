import express, { Router } from "express";
import {
  getAllArt,
  getBids,
  postBid,
} from "../controllers/auctionControllers";

const router: Router = express.Router();

//////////
// ART //
////////
router.get("/getartwork", getAllArt);

///////////
// BIDS //
/////////
router.get("/getbids", getBids);
router.post("/postbid", postBid);

export default router;
