import { Schema, model, Types } from "mongoose";

interface IAuction {
  _id: string;
  artId: number;
  published: String;
  endTime: String;
  price: number;
}

export const AuctionSchema = new Schema({
  id: {
    type: Types.ObjectId,
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
