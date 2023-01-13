import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import axios from "axios";
import { IAuction } from "../../models/IAuction";
import { IArt } from "../../models/IArt";
import { IBid } from "../../models/IBid";
import { Link } from "react-router-dom";
import { IArtAuction } from "../../models/IArtAuction";

interface IUserAuctionsProps {
  user: IUser;
}

export const UserAuctions = (props: IUserAuctionsProps) => {
  const cookies = new Cookies();

  const [ongoingAuctions, setOngoingAuctions] = useState<IArtAuction[]>([]);
  const [endedAuctions, setEndedAuctions] = useState<IArtAuction[]>([]);
  const [highBids, setHighBids] = useState<IBid[]>([]);

  const getAuctions = async () => {
    const user: any = jwt(cookies.get("logIn"));

    let res: any = await axios.get(
      "http://localhost:3001/account/getuserauctions/?userId=" + user.id
    );
    // console.log("auctions",res.data.artauctions);
    // console.log("bids",res.data.highBids);

    setOngoingAuctions(res.data.ongoing);
    setEndedAuctions(res.data.ended);
    setHighBids(res.data.highBids);
  };

  useEffect(() => {
    getAuctions();
  }, []);

  function displayAuctions(auctionList: IArtAuction[], ended: boolean) {
    const list: any = [];
    console.log(ongoingAuctions);

    auctionList.map((art: IArtAuction) => {
      highBids.map((bid) => {
        if (bid.auctionId == art._id) {
          list.push(
            <div
              key={art.objectID}
              className="account__section--auctions__auctionSingle"
            >
              <Link className="auctLink" to={"/auction/" + art.artId}>
                <h4 className="title">{art.title}</h4>
                <img src={art.primaryImage} alt={art.title} />
                <div className="infoBox">
                  <div className="infoDetail">
                    {ended ? <h4>Ended at</h4> : <h4>Leading bid</h4>}
                    <span>{bid.amount}</span>
                  </div>
                  <div className="infoDetail">
                    <h4>Starting price</h4>
                    <span>{art.price}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        }
      });
    });
    console.log(list);

    return list;
  }

  return (
    <div className="account__section account__section--auctions">
      {displayAuctions(ongoingAuctions, false)}
      {displayAuctions(endedAuctions, true)}
    </div>
  );
};
