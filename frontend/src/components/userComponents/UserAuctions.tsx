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
import { useAuctions } from "../AuctionProvider";

interface IUserAuctionsProps {
  highBids: IBid[];
  ongoingAuctions: IArtAuction[];
  endedAuctions: IArtAuction[];
}

export const UserAuctions = (props: IUserAuctionsProps) => {
  const cookies = new Cookies();

  function displayAuctions(auctionList: IArtAuction[], ended: boolean) {
    const list: any = [];

    auctionList.map((art: IArtAuction) => {
      props.highBids.map((bid) => {
        if (bid.auctionId == art._id) {
          list.push(
            <div
              key={art.objectID}
              className="account__section--auctions__auctionSingle"
            >
              <Link className="auctLink" to={"/auction/" + art.artId}>
                <h4 className="title">{art.title}</h4>
                <div className="imgContainer">
                  <img src={art.primaryImage} alt={art.title} />
                </div>
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

    return list;
  }

  return (
    <div className="account__section account__section--auctions">
      {displayAuctions(props.ongoingAuctions, false)}
      {displayAuctions(props.endedAuctions, true)}
    </div>
  );
};
