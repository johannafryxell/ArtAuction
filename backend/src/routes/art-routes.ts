import express, { Router, Request, Response } from "express";
import { Auction } from "../models/AuctionModel";
import {
  getAllArt,
  getAuctions,
  getBids,
  getSingleAuction,
  getTodaysAuction,
  postBid,
} from "../controllers/artControllers";

const router: Router = express.Router();

//////////
// ART //
////////
router.get("/getartwork", getAllArt);

///////////////
// AUCTIONS //
/////////////
router.get("/getauctions", getAuctions);
router.get("/gettodaysauction", getTodaysAuction);
router.get("/getsingleauction", getSingleAuction);

///////////
// BIDS //
/////////
router.get("/getbids", getBids);
router.post("/postbid", postBid);

export default router;
