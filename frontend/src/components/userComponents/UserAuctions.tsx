import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import axios from "axios";
import { IAuction } from "../../models/IAuction";
import { IArt } from "../../models/IArt";
import { IBid } from "../../models/IBid";
import { Link } from "react-router-dom";

interface IUserAuctionsProps {
  user: IUser;
}

export const UserAuctions = (props: IUserAuctionsProps) => {
  const cookies = new Cookies();
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [artList, setArtlist] = useState<IArt[]>([]);
  const [highBids, setHighBids] = useState<IBid[]>([]);

  const getAuctions = async () => {
    const user: any = jwt(cookies.get("logIn"));

    let res: any = await axios.get(
      "http://localhost:3001/account/getuserauctions/?userId=" + user.id
    );
    setAuctions(res.data.auctions);
    setArtlist(res.data.art);
    setHighBids(res.data.highBids);
  };

  useEffect(() => {
    getAuctions();
  }, []);

  function displayAuctions() {
    const list: any = [];
    console.log(highBids);

    auctions.map((auction) => {
      artList.map((art) => {
        if (art.objectID == auction.artId.toString()) {
          highBids.map((bid) => {
            if (bid.auctionId == auction._id.toString()) {
              list.push(
                <div
                  key={art.objectID}
                  className="account__section--auctions__auctionSingle"
                >
                  <Link className="auctLink" to={"/auction/" + auction.artId}>
                    <h4 className="title">{art.title}</h4>
                    <img src={art.primaryImage} alt={art.title} />
                    <div className="infoDetail">
                      <h4>Leading bid</h4>
                      <span>{bid.amount}</span>
                    </div>
                    <div className="infoDetail">
                      <h4>Starting price</h4>
                      <span>{auction.price}</span>
                    </div>
                  </Link>
                </div>
              );
            }
          });
        }
      });
    });
    console.log(list);

    return list;
  }

  return (
    <div className="account__section account__section--auctions">
      {displayAuctions()}
    </div>
  );
};
