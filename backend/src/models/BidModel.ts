import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

export interface IBid {
  _id: ObjectId;
  auctionId: ObjectId;
  userId: ObjectId;
  amount: number;
  published: string;
}

export const BidSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  auctionId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
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
