import { Link } from "react-router-dom";
import { useAuctions } from "../AuctionProvider";

interface ISuggestionProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
}

export const Suggestion = (props: ISuggestionProps) => {
  const auctions = useAuctions().auctions;

  const randomAuction = Math.floor(Math.random() * auctions.length);
  const handleClick = () => {
    props.setId(auctions[randomAuction].objectID);
  };

  return (
    <div className="detail__artinfo--box">
        <h3>You might also like</h3>
      <div className="detail__artinfo--box__suggestedImg">
        <Link
          onClick={handleClick}
          className="imgLink"
          to={"/auction/" + auctions[randomAuction].objectID}
        >
          <div className="imgContainer">
            <img src={auctions[randomAuction].primaryImage} alt="art" />
          </div>
        </Link>
        
      </div>
    </div>
  );
};
