import axios from "axios";
import { useEffect, useState } from "react";
import { IAuction } from "../../models/IAuction";
import { IBid } from "../../models/IBid";

interface IAuctionBidProps {
  auction: IAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  const [bids, setBids] = useState<IBid[]>([]);
  const [highestBid, sethighestBid] = useState<number>(0);

  const getBids = async () => {
    let auctionId = props.auction._id;

    let res: any = await axios.get(
      "http://localhost:3001/art/getbids/?auctionId=" + auctionId
    );
    setBids(res.data);

    const highBid = Math.max(
      ...(res.data as Array<IBid>).map((bid) => bid.amount)
    );
    sethighestBid(highBid);
  };

  useEffect(() => {
    getBids();
  }, [props.auction]);

  return (
    <div className="detail__artinfo--box">
      <div>
        <span>Ends</span>
        <span>{props.auction.endTime}</span>
      </div>
      <div>
        <span>Current bid</span>
        <span>{highestBid}</span>
      </div>
      <div className="inputBox">
        <input type="text" />
        <button>Place Bid</button>
      </div>
      <div>
        <span>Bid history</span>
        {/* Utfällbart grej */}
      </div>
    </div>
  );
};
