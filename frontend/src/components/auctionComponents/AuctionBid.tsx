import { IAuction } from "../../models/IAuction";

interface IAuctionBidProps {
  auction: IAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  return (
    <>
      <div className="detail__artinfo--box">
        <div>
          <div>
            <span>Auction closes</span>
            <span>{props.auction.endTime}</span>
          </div>
          <div>
            <span>Current bid</span>
            <span>*highest bid*</span>
          </div>
          <div>
            <input type="text" />
            <button>Place Bid</button>
          </div>
          <div>
            <span>Bid history</span>
            {/* Utfällbart grej */}
          </div>
        </div>
      </div>
    </>
  );
};
