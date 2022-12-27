import { IArt } from "../../models/IArt";

interface IAuctionImageProps {
  art: IArt;
}

export const AuctionImage = (props: IAuctionImageProps) => {
  return (
    <>
      <div className="detail__artwork--imageBox">
        <img src={props.art.primaryImage} alt={props.art.objectName} />
      </div>
    </>
  );
};
