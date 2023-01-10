export interface IBid {
  _id: string;
  auctionId: string;
  userId: string;
  amount: number;
  published: string;
}

export interface IPlaceBid {
  auctionId: string;
  userId: string;
  amount: number;
  published: string;
}

