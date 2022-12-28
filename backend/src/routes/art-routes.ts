import express, { Router, Request, Response } from "express";
import { Auction } from "../models/AuctionModel";
import {
  getAllArt,
  getAuctions,
  getSingleAuction,
  getTodaysAuction,
} from "../controllers/artControllers";

const router: Router = express.Router();

//Gets all auctions from database
router.get("/getauctions", getAuctions);

router.get("/getartwork", getAllArt);

router.get("/gettodaysauction", getTodaysAuction);

router.get("/getsingleauction", getSingleAuction);

export default router;
