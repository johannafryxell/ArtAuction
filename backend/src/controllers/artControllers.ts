import axios from "axios";
import { Request, Response } from "express";
import { fetchData } from "../../services/fetchData";
import { Auction } from "../models/AuctionModel";
import { IArt } from "../../../frontend/src/models/IArt";
import { Bids } from "../models/BidModel";
import { ObjectId } from "mongodb";

//////////////////////
// ART CONTROLLERS //
////////////////////
export const getAuctions = async (req: Request, res: Response) => {
  try {
    const auctions = await Auction.find({}).sort("desc").lean();
    res.send(auctions);
  } catch (err) {
    res.send(err);
  }
  return;
};

export const getTodaysAuction = async (req: Request, res: Response) => {
  const todayString = getToday();

  const auction = await Auction.findOne({ endTime: todayString });

  axios
    .get(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
        auction?.artId
    )
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    });
};

export const getSingleAuction = async (req: Request, res: Response) => {
  let { id } = req.query;
  const todayString = getToday();

  try {
    const auction = await Auction.findOne({ artId: id });

    if (auction?.endTime == todayString) {
      res.send({
        today: true,
        auction: auction,
      });
    } else {
      res.send({
        today: false,
        auction: auction,
      });
    }
  } catch (err) {
    console.log(err);
    res.send("error");
  }
  return;
};

export const getBids = async (req: Request, res: Response) => {
  const { auctionId } = req.query as { auctionId: string };

  try {
    const bids = await Bids.find({ auctionId: new ObjectId(auctionId) }).lean();
    res.send(bids);
  } catch (err) {
    res.send(err);
  }
  return;
};

export const getAllArt = async (req: Request, res: Response) => {
  const url =
    "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  const auctions = await Auction.find({}).sort("desc").lean();
  const artList: IArt[] = [];

  const art = await Promise.all(
    auctions.map(async (auction) => {
      const auctionsData: IArt = await fetchData(url + auction.artId);
      artList.push(auctionsData);
    })
  );
  res.send(artList);
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
