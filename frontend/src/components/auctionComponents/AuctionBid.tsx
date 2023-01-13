import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IAuction } from "../../models/IAuction";
import { IBid, IPlaceBid } from "../../models/IBid";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { AuthContext, IAuth } from "../AuthProvider";
import { CountDown } from "./CountDown";

interface IAuctionBidProps {
  auction: IAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  const cookies = new Cookies();

  const { auth } = useContext(AuthContext) as IAuth;

  const [bids, setBids] = useState<IBid[]>([]);
  const [highestBid, sethighestBid] = useState<number>(0);
  const [newBid, setNewBid] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState(false);
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
      "http://localhost:3001/art/getbids/?auctionId=" + auctionId
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
      const userToken = cookies.get("logIn");
      const decoded: any = jwt(userToken);
      let body: IPlaceBid = {
        auctionId: props.auction._id,
        userId: decoded.id,
        amount: newBid,
        published: new Date().toDateString(),
      };
      if (newBid <= highestBid + 49) {
        setErrorMsg(true);
        setNewBid(highestBid + 50);
      } else if (newBid < props.auction.price) {
        setErrorMsg(true);
        setNewBid(props.auction.price + 50);
      } else {
        try {
          await axios.post("http://localhost:3001/art/postbid", body);
          setNewBid(0);
          setErrorMsg(false);
        } catch (err) {
          console.log(err);
          console.log("error");
        }
      }
    } else {
      console.log("You need to be logged in");
    }
  };

  function bidMessage() {
    if (!errorMsg && props.auction.price < highestBid) {
      return <span>Place {highestBid + 50} or more</span>;
    } else if (errorMsg && props.auction.price < highestBid) {
      return <span className="errorMsg">Place {highestBid + 50} or more</span>;
    } else if (errorMsg) {
      return (
        <span className="errorMsg">
          Place {props.auction.price + 50} or more
        </span>
      );
    } else {
      return <span>Place {props.auction.price + 50} or more</span>;
    }
  }

  return (
    <>
      {ended ? (
        <div className="detail__artinfo--box">
          <span>Auction ended {new Date(props.auction.endTime).toDateString()}</span>
          <span>Sold for {highestBid}</span>
        </div>
      ) : (
        <div className="detail__artinfo--box">
          <div className="bidInfo">
            <CountDown endTime={props.auction.endTime}></CountDown>
          </div>
          <div className="bidInfo">
            {props.auction.price < highestBid ? (
              <>
                <span>Current bid</span>
                <span>{highestBid}</span>
              </>
            ) : (
              <>
                <span>Starting price</span>
                <span>{props.auction.price}</span>
              </>
            )}
          </div>
          <div className="minBox">{bidMessage()}</div>
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
