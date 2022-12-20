import { Request, Response } from "express";
import { Auction } from "../models/AuctionModel";

export const getTodaysAuction = async (req: Request, res: Response) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const todayString = mm + "/" + dd + "/" + yyyy;

  const auction = await Auction.findOne({ endTime: todayString });
  res.send(auction);
};