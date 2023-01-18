import { ChangeEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, IAuth } from "../AuthProvider";
import { CountDown } from "./CountDown";
import { IBid, IPlaceBid } from "../../interface/IBid";
import { IArtAuction } from "../../interface/IArtAuction";

interface IAuctionBidProps {
  auction: IArtAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  const { auth } = useContext(AuthContext) as IAuth;
  const { userId } = useContext(AuthContext) as IAuth;

  const [bids, setBids] = useState<IBid[]>([]);
  const [highestBid, sethighestBid] = useState<IBid>({
    _id: "",
    auctionId: "",
    userId: "",
    amount: 0,
    published: "",
  });
  const [newBid, setNewBid] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [ended, setEnded] = useState(false);

  function calcEndTime() {
    let endTime = props.auction.endTime.toLocaleString();
    let today = new Date().toLocaleString();

    if (new Date(today) >= new Date(endTime)) {
      setEnded(true);
    } else {
      setEnded(false);
    }
  }

  const getBids = async () => {
    let auctionId = props.auction._id;

    let res: any = await axios.get(
      "http://localhost:3001/auction/getbids/?auctionId=" + auctionId
    );

    if (res.data.bids) {
      setBids(res.data.bids);
      sethighestBid(res.data.highBid);
    }
  };

  const handleBid = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBid(+e.target.value);
  };

  useEffect(() => {
    getBids();
  }, [props.auction, newBid]);

  useEffect(() => {
    calcEndTime();
  }, [props.auction]);

  const placeBid = async () => {
    if (auth) {
      let body: IPlaceBid = {
        auctionId: props.auction._id,
        userId: userId,
        amount: newBid,
        published: new Date().toDateString(),
      };

      if (newBid <= highestBid.amount + 49) {
        setErrorMsg(true);
        setNewBid(highestBid.amount + 50);
      } else if (newBid < props.auction.price) {
        setErrorMsg(true);
        setNewBid(props.auction.price + 50);
      } else {
        try {
          await axios.post("http://localhost:3001/auction/postbid", body);
          setNewBid(0);
          setErrorMsg(false);
        } catch (err) {
          console.log(err);
          console.log("error");
        }
      }
    } else {
      setErrorLogin(true);
      setNewBid(0);
    }
  };

  function bidMessage() {
    if (!errorMsg && props.auction.price <= highestBid.amount) {
      return <span>Place {highestBid.amount + 50} or more</span>;
    } else if (errorMsg && props.auction.price <= highestBid.amount) {
      return (
        <span className="errorMsg">Place {highestBid.amount + 50} or more</span>
      );
    } else if (errorMsg) {
      return (
        <span className="errorMsg">Place {props.auction.price} or more</span>
      );
    } else {
      return <span>Place {props.auction.price} or more</span>;
    }
  }

  return (
    <>
      {ended ? (
        <div className="detail__artinfo--box detail__artinfo--box__ended">
          <div className="endDate">
            <span>Auction ended</span>
            <span>
              {new Date(props.auction.endTime)
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </span>
          </div>
          {highestBid.amount != 0 && (
            <div className="sold">
              {highestBid.userId == userId ? (
                <span>You won at</span>
              ) : (
                <span>Sold for</span>
              )}
              <span>{highestBid.amount}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="detail__artinfo--box">
          <div className="bidInfo">
            <CountDown endTime={props.auction.endTime}></CountDown>
          </div>
          <div className="bidInfo">
            {props.auction.price <= highestBid.amount ? (
              <>
                <span>Current bid {userId == highestBid.userId && '(yours)'}</span>
                <span className="currentPrice">{highestBid.amount}</span>
              </>
            ) : (
              <>
                <span>Starting price</span>
                <span className="currentPrice">{props.auction.price}</span>
              </>
            )}
          </div>
          <div className="minBox">
            {errorLogin ? (
              <span className="errorMsg">Log in to place bid</span>
            ) : (
              bidMessage()
            )}
          </div>
          <div className="inputBox">
            {newBid == 0 ? (
              <input type="number" onChange={handleBid} value={""} />
            ) : (
              <input type="number" onChange={handleBid} value={newBid} />
            )}
            <button onClick={placeBid} id="bidInput">
              Place Bid
            </button>
          </div>
          <div className="bidInfo">
            <span>Bid history</span>
            <span>{bids.length} bids</span>
          </div>
        </div>
      )}
    </>
  );
};
