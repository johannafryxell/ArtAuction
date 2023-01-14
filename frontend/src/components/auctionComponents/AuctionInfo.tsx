import { IArt } from "../../models/IArt";
import { IArtAuction } from "../../models/IArtAuction";

interface IAuctionInfoProps {
  auction: IArtAuction;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
    <div className="detail__artinfo--box">
      <h3>About the piece</h3>
      <div className="detail__artinfo--box__detail">
        {props.auction.title ? (
          <div className="detailInfo">
            <h4>Title</h4>
            <span>{props.auction.title} </span>
          </div>
        ) : (
          ""
        )}
        {props.auction.country ? (
          <div className="detailInfo">
            <h4>Origin</h4>
            <span>{props.auction.country} </span>
          </div>
        ) : (
          ""
        )}
        {props.auction.accessionYear ? (
          <div className="detailInfo">
            <h4>Accession</h4>
            <span>{props.auction.accessionYear} </span>
          </div>
        ) : (
          ""
        )}
        {props.auction.period ? (
          <div className="detailInfo">
            <h4>Period</h4>
            <span>{props.auction.period} </span>
          </div>
        ) : (
          ""
        )}
        {props.auction.artistDisplayName ? (
          <div className="detailInfo">
            <h4>Artist</h4>
            <span>{props.auction.artistDisplayName} </span>
          </div>
        ) : (
          ""
        )}
        {props.auction.artistDisplayBio ? (
          <div className="detailInfo">
            <h4>Bio</h4>
            <span>{props.auction.artistDisplayBio} </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
