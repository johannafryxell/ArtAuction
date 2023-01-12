import axios from "axios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IAuction } from "../../models/IAuction";
import { IBid, IPlaceBid } from "../../models/IBid";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { AuthContext, IAuth } from "../AuthProvider";

interface IAuctionBidProps {
  auction: IAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  const cookies = new Cookies();

  const { auth } = useContext(AuthContext) as IAuth;

  const [bids, setBids] = useState<IBid[]>([]);
  const [startBid, setStartBid] = useState<number>(500);
  const [highestBid, sethighestBid] = useState<number>(0);
  const [newBid, setNewBid] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState(false);

  const getBids = async () => {
    let auctionId = props.auction._id;

    let res: any = await axios.get(
      "http://localhost:3001/art/getbids/?auctionId=" + auctionId
    );
    setBids(res.data.bids);
    sethighestBid(res.data.highBid);
  };

  const handleBid = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBid(+e.target.value);
  };

  useEffect(() => {
    getBids();
  }, [props.auction, newBid]);

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
      } else {
        try {
          await axios.post("http://localhost:3001/art/postbid", body);
        } catch (err) {
          console.log(err);
          console.log("error");
        }
        setNewBid(0);
        setErrorMsg(false);
      }
    } else {
      console.log("You need to be logged in");
    }
  };

  function bidMessage() {
    if (!errorMsg && bids.length != 0) {
      return <span>Place {highestBid + 50} or more</span>;
    } else if (errorMsg && bids.length != 0) {
      return <span className="errorMsg">Place {highestBid + 50} or more</span>;
    } else if (errorMsg) {
      return <span className="errorMsg">Place {startBid + 50} or more</span>;
    } else {
      return <span>Place {startBid + 50} or more</span>;
    }
  }

  return (
    <div className="detail__artinfo--box">
      <div className="bidInfo">
        <span>Ends</span>
        <span>{props.auction.endTime}</span>
      </div>
      <div className="bidInfo">
        {bids.length != 0 ? (
          <>
            <span>Current bid</span>
            <span>{highestBid}</span>
          </>
        ) : (
          <>
            <span>Starting price</span>
            <span>{startBid}</span>
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
  );
};
