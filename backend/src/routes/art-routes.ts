import express, { Router, Request, Response } from "express";
import { Auction } from "../models/AuctionModel";
import {
  getSingleAuction,
  getTodaysAuction,
} from "../controllers/artControllers";

const router: Router = express.Router();

//Gets all auctions from database
router.get("/getauctions", async (req, res) => {
  try {
    const auctions = await Auction.find({}).sort("desc").lean();
    res.send(auctions);
  } catch (err) {
    res.send(err);
  }
  return;
});

router.get("/gettodaysauction", getTodaysAuction);

router.get("/getsingleauction", getSingleAuction);

export default router;
