import { useEffect, useState } from "react";
import { IArtAuction } from "../../models/IArtAuction";
import { IBid } from "../../models/IBid";
import { IUser } from "../../models/IUser";

interface IAboutUserProps {
  highBids: IBid[];
  ongoingAuctions: IArtAuction[];
  endedAuctions: IArtAuction[];
  user: IUser;
}

export const AboutUser = (props: IAboutUserProps) => {
  const [endSoonImg, setEndSoonImg] = useState("")

  useEffect(() =>{
    if(props.ongoingAuctions.length != 0){
      setEndSoonImg(props.ongoingAuctions[0].primaryImage)
    }
  },[props.ongoingAuctions])

  return (
    <div className="account__section account__section--user">
      <h3>
        {props.user.firstName} {props.user.lastName}
      </h3>
      <div className="account__section--user__bigBox">
        <div className="endSoon">
          <span>Ending soon</span>
          <div className="imgContainer">
            <img
              src={endSoonImg}
              alt="artwork"
            />
          </div>
        </div>
      </div>
      <div className="account__section--user__statistics">
        <div className="statBox">
          <span>Active in</span>
          <span>{props.ongoingAuctions.length}</span>
        </div>

        <div className="statBox">
          <span>Leading</span>
          <span>1</span>
        </div>

        <div className="statBox">
          <span>Won</span>
          <span>2</span>
        </div>
      </div>
      <div className="account__section--user__logout">
        <button>Log out</button>
      </div>
    </div>
  );
};
