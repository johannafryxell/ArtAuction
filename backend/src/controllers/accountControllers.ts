import { IUser, Users } from "../models/UserModel";
import { Request, Response } from "express";
import { Bids, IBid } from "../models/BidModel";
import { ObjectId } from "mongodb";
import { Auction } from "../models/AuctionModel";
import { IArt } from "../../../frontend/src/models/IArt";
import { IArtAuction } from "../../../frontend/src/models/IArtAuction";
import { fetchData } from "../../services/fetchData";
import { IAuction } from "../../../frontend/src/models/IAuction";
const jwt = require("jsonwebtoken");

//////////////////////////
// ACCOUNT CONTROLLERS //
////////////////////////
export const getAccount = async (req: Request, res: Response) => {
  let { email } = req.body;

  Users.findOne({ email }, (err: any, user: IUser) => {
    if (user) {
      res.send(user);
    } else {
      res.send("error");
    }
  });
};

export const getUserAuctions = async (req: Request, res: Response) => {
  let { userId } = req.query as { userId: string };

  // Get distinct id:s of auctions user has bidded on
  const userAuctIds = await Bids.find({
    userId: new ObjectId(userId),
  }).distinct("auctionId");

  // Finds the highest bid of the users auctions
  const highBids = await Bids.aggregate([
    { $match: { auctionId: { $in: userAuctIds } } },
    { $sort: { amount: -1 } },
    { $group: { _id: "$auctionId", highestBid: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$highestBid" } },
  ]);

  //Get the auction objects from the id:s
  const auctions = await Auction.find().where("_id").in(userAuctIds).lean().exec();

  //Get the art info
  const url =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  const artList: IArt[] = [];

  const art = await Promise.all(
    auctions.map(async (auction) => {
      const auctionsData: IArt = await fetchData(url + auction.artId);
      artList.push(auctionsData);
    })
  );

  const combined = auctions.map((auction) => {
    const matchedArt = artList.find((art) => +art.objectID === auction.artId);
    return { ...auction, ...matchedArt };
  });
  
  const ongoing = combined.filter((p) => +p.endTime >= +new Date());

  const ended = combined.filter((p) => +p.endTime <= +new Date());  

  res.send({ ongoing: ongoing ,ended: ended,  highBids: highBids });
  // res.send({ auctions: auctions, art: artList, highBids: highBids });
};
