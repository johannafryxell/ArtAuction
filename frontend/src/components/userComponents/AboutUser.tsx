import userEvent from "@testing-library/user-event";
import { spawn } from "child_process";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IArtAuction } from "../../models/IArtAuction";
import { IBid } from "../../models/IBid";
import { IUser } from "../../models/IUser";
import { CountDown } from "../auctionComponents/CountDown";
import { AuthContext, IAuth } from "../AuthProvider";
import { SkeletonImage } from "../layoutComponents/LoaderImage";

interface IAboutUserProps {
  highBids: IBid[];
  ongoingAuctions: IArtAuction[];
  endedAuctions: IArtAuction[];
  user: IUser;
}

export const AboutUser = (props: IAboutUserProps) => {
  const [endSoon, setEndSoon] = useState<IArtAuction>({
    _id: "",
    artId: 0,
    published: "",
    endTime: "",
    price: 0,
    objectID: 0,
    primaryImage: "",
    objectName: "",
    title: "",
    country: "",
    artistDisplayName: "",
    period: "",
    accessionYear: "",
    artistDisplayBio: "",
  });
  const { onLogout } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();

  useEffect(() => {
    if (props.ongoingAuctions.length != 0) {
      setEndSoon(props.ongoingAuctions[0]);
    }
  }, [props.ongoingAuctions]);

  function logOut() {
    onLogout();
    navigate("/login");
  }

  function calcStatistics(list: IArtAuction[]) {
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
          {endSoon._id == "" ? (
            <div className="introText">
              <p>
                Welcome {props.user.firstName}! This is your overview. Once
                you've entered some auctions, information about them will be
                presented here.
              </p>
              <Link to={"/"} className="explore">Get out and explore the arternatives!</Link>
            </div>
          ) : (
            <>
              <h4>Ending soon</h4>
              <Link className="auctLink" to={"/auction/" + endSoon.objectID}>
                <div className="imgContainer">
                  <img src={endSoon.primaryImage} alt="artwork" />
                </div>
                <div className="endTimeContainer">
                  <CountDown endTime={endSoon.endTime} />
                </div>
              </Link>
            </>
          )}
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
