import { IArt } from "../../models/IArt";

interface IAuctionImageProps {
  image: string;
  name: string;
}

export const AuctionImage = (props: IAuctionImageProps) => {
  return (
    <>
      <div className="detail__artwork--imageBox">
        <div className="imgContainer">
          <img src={props.image} alt={props.name} />
        </div>
      </div>
    </>
  );
};
