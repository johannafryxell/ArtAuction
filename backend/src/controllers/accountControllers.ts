import { IUser, Users } from "../models/UserModel";
import { Request, Response } from "express";
import { Bids } from "../models/BidModel";
import { ObjectId } from "mongodb";

//////////////////////////
// ACCOUNT CONTROLLERS //
////////////////////////
export const getAccount = async (req: Request, res: Response) => {
  let { userId } = req.query as { userId: string };
  console.log("get account");
  console.log(userId);
  

  Users.findOne({ userId }, (err: any, user: IUser) => {
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

  res.send({highBids: highBids, auctionIds: userAuctIds });
};
