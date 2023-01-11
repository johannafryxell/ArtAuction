import { IArt } from "../../models/IArt";

interface IAuctionInfoProps {
  art: IArt;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
    <div className="detail__artinfo--box">
      <h3>About the piece</h3>
      <div className="detail__artinfo--box__detail">
        {props.art.title ? (
          <div className="detailInfo">
            <h4>Title</h4>
            <span>{props.art.title} </span>
          </div>
        ) : (
          ""
        )}
        {props.art.country ? (
          <div className="detailInfo">
            <h4>Origin</h4>
            <span>{props.art.country} </span>
          </div>
        ) : (
          ""
        )}
        {props.art.accessionYear ? (
          <div className="detailInfo">
            <h4>Accession</h4>
            <span>{props.art.accessionYear} </span>
          </div>
        ) : (
          ""
        )}
        {props.art.period ? (
          <div className="detailInfo">
            <h4>Period</h4>
            <span>{props.art.period} </span>
          </div>
        ) : (
          ""
        )}
        {props.art.artistDisplayName ? (
          <div className="detailInfo">
            <h4>Artist</h4>
            <span>{props.art.artistDisplayName} </span>
          </div>
        ) : (
          ""
        )}
        {props.art.artistDisplayBio ? (
          <div className="detailInfo">
            <h4>Bio</h4>
            <span>{props.art.artistDisplayBio} </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
