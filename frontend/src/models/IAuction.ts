export interface IAuction {
  // id: string;
  artId: number;
  published: string;
  endTime: string;
  // bidList: IBid[];
  bidList: [];
}

export interface IBid {
  id: string;
  userId: string;
  amount: number;
  published: string;
}
