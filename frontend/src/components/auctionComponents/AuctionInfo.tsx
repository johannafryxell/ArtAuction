import { IArt } from "../../models/IArt";

interface IAuctionInfoProps {
  art: IArt;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
    <div className="detail__artinfo--box">
      <span>{props.art.title ? props.art.title : "Unknown"}</span>
      <span>{props.art.country ? props.art.country : "Unknown"}</span>
      <span>{props.art.period ? props.art.period : "Unknown"}</span>
      <span>
        {props.art.artistDisplayName ? props.art.artistDisplayName : "Unknown"}
      </span>
    </div>
  );
};
