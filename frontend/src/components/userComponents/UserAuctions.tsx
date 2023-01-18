import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// INTERFACE //
import { IUser } from "../../interface/IUser";
import { IBid } from "../../interface/IBid";
import { IArtAuction } from "../../interface/IArtAuction";
import { AuthContext, IAuth } from "../AuthProvider";

interface IUserAuctionsProps {
  highBids: IBid[];
  ongoingAuctions: IArtAuction[];
  endedAuctions: IArtAuction[];
  user: IUser;
}

export const UserAuctions = (props: IUserAuctionsProps) => {
  const [filter, setFilter] = useState("all");
  const { userId } = useContext(AuthContext) as IAuth;

  const changeFilter = (event: any) => {
    setFilter(event.target.value);
  };

  function displayAuctions(auctionList: IArtAuction[], ended: boolean) {
    const list: any = [];

    auctionList.map((art: IArtAuction) => {
      props.highBids.map((bid) => {
        if (bid.auctionId == art._id) {
          list.push(
            <div
              key={art.objectID}
              className={
                ended && filter == "all"
                  ? "account__section--auctions__auctionBox--auctionSingle account__section--auctions__auctionBox--auctionSingle__ended"
                  : "account__section--auctions__auctionBox--auctionSingle"
              }
            >
              <Link className="auctLink" to={"/auction/" + art.artId}>
                <h4 className="title">{art.title}</h4>
                <div className="imgContainer">
                  <img src={art.primaryImage} alt={art.title} />
                </div>
                <div className="infoBox">
                  <div className="infoDetail">
                    {ended && bid.userId == userId && (
                      <h4>You won at</h4>
                    )}
                    {ended && bid.userId != userId && <h4>Ended at</h4>}
                    {!ended && <h4>Leading bid</h4>}
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

    return list;
  }

  return (
    <>
      <div className="account__section account__section--auctions">
        <div className="account__section--auctions__filter">
          <span>Display: </span>
          <select name="filter" id="filter" onChange={changeFilter}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="ended">Ended</option>
          </select>
        </div>
        {props.highBids.length == 0 && (
          <div className="account__section--auctions__emptyBox">
            <span>You have nothing to overview...</span>
          </div>
        )}
        <div className="account__section--auctions__auctionBox">
          {/* account__section--auctions__auctionSingle */}
          {(filter == "all" || filter == "active") &&
            displayAuctions(props.ongoingAuctions, false)}
          {(filter == "all" || filter == "ended") &&
            displayAuctions(props.endedAuctions, true)}
        </div>
      </div>
    </>
  );
};
