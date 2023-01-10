import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface IBid {
  _id: string;
  auctionId: string;
  userId: string;
  amount: number;
  published: string;
}

export const BidSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  auctionId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  published: {
    type: String,
    required: true,
  },
});

export const Bids = model<IBid>("Bids", BidSchema);
