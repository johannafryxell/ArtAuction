import express, { Router, Request, Response } from "express";
import { Auction } from "../models/AuctionModel"

const router: Router = express.Router();

//Gets all auctions from database
router.get("/getauctions", async (req, res) => {
  try {
    const auctions = await Auction.find({}).lean();
    res.send(auctions);
  } catch (err) {
    res.send(err);
  }
  return
});

export default router;