import { Request, Response } from "express";
import { Auction } from "../models/AuctionModel";

//////////////////////
// ART CONTROLLERS //
////////////////////
export const getTodaysAuction = async (req: Request, res: Response) => {
  const todayString = getToday();

  const auction = await Auction.findOne({ endTime: todayString });
  res.send(auction);
};

export const getSingleAuction = async (req: Request, res: Response) => {
  let { id } = req.query;
  const todayString = getToday();

  try {
    const auction = await Auction.findOne({ id: id });

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
    res.send(err);
  }
  return;
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
