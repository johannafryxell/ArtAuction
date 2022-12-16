export interface IAuction {
  id: string;
  artId: number;
  published: Date;
  endTime: Date;
  bidList: IBid[];
}

export interface IBid {
  id: string;
  userId: string;
  amount: number;
  published: Date;
}
