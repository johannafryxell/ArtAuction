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

  const handleBid = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBid(+e.target.value);
  };

  useEffect(() => {
    getBids();
  }, [props.auction]);

  const placeBid = async () => {
    const userToken = cookies.get("logIn");
    if (auth) {
      const decoded: any = jwt(userToken);
      let body: IPlaceBid = {
        auctionId: props.auction._id,
        userId: decoded.id,
        amount: newBid,
        published: new Date().toDateString(),
      };
      if (newBid < highestBid) {
        console.log(newBid);
        console.log("is to low");
      } else {
        try {
          await axios.post("http://localhost:3001/art/postbid", body);
        } catch (err) {
          console.log(err);
          console.log("error");
        }
        console.log("higher");
      }
    } else {
      console.log("You need to be logged in");
    }
  };

  return (
    <div className="detail__artinfo--box">
      <div>
        <span>Ends</span>
        <span>{props.auction.endTime}</span>
      </div>
      <div>
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
      <div className="minBox">
        {bids.length != 0 ? (
          <span>Place {highestBid + 20} or more</span>
        ) : (
          <span>Place {startBid + 20} or more</span>
        )}
      </div>
      <div className="inputBox">
        <input type="number" onChange={handleBid} />
        <button onClick={placeBid}>Place Bid</button>
      </div>
      <div>
        <span>Bid history</span>
        <span>{bids.length} bids</span>
      </div>
    </div>
  );
};
