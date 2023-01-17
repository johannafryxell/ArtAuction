import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { Auction } from "../models/AuctionModel";
import { IArt } from "../../../frontend/src/interface/IArt";
import { IAuction } from "../../../frontend/src/interface/IAuction";
import { Bids, IBid } from "../models/BidModel";
import { ObjectId } from "mongodb";

//////////////////////
// BID CONTROLLERS //
////////////////////
export const getBids = async (req: Request, res: Response) => {
  const { auctionId } = req.query as { auctionId: string };

  try {
    const bids = await Bids.find({ auctionId: new ObjectId(auctionId) }).lean();
    const highBid = Math.max(...(bids as Array<IBid>).map((bid) => bid.amount));

    res.send({ bids: bids, highBid: highBid });
  } catch (err) {
    res.send(err);
  }
  return;
};

export const postBid = async (req: Request, res: Response) => {
  const { auctionId, userId, amount, published } = req.body;

  try {
    const bids = await Bids.find({ auctionId: new ObjectId(auctionId) }).lean();
    const highBid = Math.max(...(bids as Array<IBid>).map((bid) => bid.amount));

    if (amount <= highBid + 49) {
      console.log("You need to pay more");
    } else {
      const newBid = new Bids({
        _id: new ObjectId(),
        auctionId: auctionId,
        userId: new ObjectId(userId),
        amount: amount,
        published: published.toString(),
      });
      newBid.validateSync();
      await newBid.save();
      res.send("success");
    }
  } catch (err) {
    res.send(err);
  }
};

//////////////////////
// ART CONTROLLERS //
////////////////////
export const getAllArt = async (req: Request, res: Response) => {
  console.log("Getting art");

  //Find all auctions and sort
  let auctions: IAuction[] = await Auction.find({}).sort({ endTime: 1 }).lean();

  //Remove all that has ended
  // auctions = auctions.filter((p) => p.endTime >= new Date());

  const url =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  const artList: IArt[] = [];
  const art = await Promise.all(
    auctions.map(async (auction) => {
      const auctionsData: IArt = await fetchData(url + auction.artId);
      artList.push(auctionsData);
    })
  );

  //Combine the lists of objects
  const combined = auctions.map((auction) => {
    const matchedArt = artList.find((art) => +art.objectID === auction.artId);
    return { ...auction, ...matchedArt };
  });

  const ongoing = combined.filter((p) => +p.endTime >= +new Date());

  const ended = combined.filter((p) => +p.endTime <= +new Date());

  res.send({ ongoing: ongoing, ended: ended });
};

/////////////////////
// HELP FUNCTIONS //
///////////////////
function getToday() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const todayString = mm + "/" + dd + "/" + yyyy;

  return todayString;
}
