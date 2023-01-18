import { ObjectId } from "mongodb";
import { Schema, model, Types } from "mongoose";

interface IAuction {
  _id: ObjectId;
  artId: number;
  published: String;
  endTime: String;
  price: number;
}

export const AuctionSchema = new Schema({
  id: {
    type: ObjectId,
    required: true,
  },
  artId: {
    type: Number,
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Auction = model<IAuction>("auctions", AuctionSchema);
