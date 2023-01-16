import userEvent from "@testing-library/user-event";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IArtAuction } from "../../models/IArtAuction";
import { IBid } from "../../models/IBid";
import { IUser } from "../../models/IUser";
import { AuthContext, IAuth } from "../AuthProvider";

interface IAboutUserProps {
  highBids: IBid[];
  ongoingAuctions: IArtAuction[];
  endedAuctions: IArtAuction[];
  user: IUser;
}

export const AboutUser = (props: IAboutUserProps) => {
  const [endSoonImg, setEndSoonImg] = useState("");
  const { onLogout } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.ongoingAuctions.length != 0) {
      setEndSoonImg(props.ongoingAuctions[0].primaryImage);
    }
  }, [props.ongoingAuctions]);

  function logOut() {
    onLogout();
    navigate("/login");
  }

  function calcStatistics(list : IArtAuction[]){
    let amount: number = 0;
    props.highBids.map((bid) => {
      if (bid.userId === props.user._id) {
        amount++;
      }
    });

    amount = amount - list.length;
    if (amount > 0) {
      return amount;
    } else {
      return 0;
    }
  }

  return (
    <div className="account__section account__section--user">
      <h3>
        {props.user.firstName} {props.user.lastName}
      </h3>
      <div className="account__section--user__bigBox">
        <div className="endSoon">
          <span>Ending soon</span>
          <div className="imgContainer">
            <img src={endSoonImg} alt="artwork" />
          </div>
        </div>
      </div>
      <div className="account__section--user__statistics">
        <div className="statBox">
          <span>Active</span>
          <span>{props.ongoingAuctions.length}</span>
        </div>

        <div className="statBox">
          <span>Leading</span>
          <span>{calcStatistics(props.endedAuctions)}</span>
        </div>

        <div className="statBox">
          <span>Won</span>
          <span>{calcStatistics(props.ongoingAuctions)}</span>
        </div>
      </div>
      <div className="account__section--user__logout">
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
};
