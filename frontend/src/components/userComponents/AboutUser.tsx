import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// INTERFACE //
import { IArtAuction } from "../../interface/IArtAuction";
import { IBid } from "../../interface/IBid";
import { IUser } from "../../interface/IUser";

// COMPONENTS //
import { CountDown } from "../auctionComponents/CountDown";

// CONTEXT //
import { AuthContext, IAuth } from "../AuthProvider";
import { LoaderImage } from "../loaders/LoaderImage";

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
  const { userId } = useContext(AuthContext) as IAuth;
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

  function calcLeading() {
    let amount: number = 0;
    props.highBids.map((bid) => {
      if (bid.userId === userId) {
        amount++;
      }
    });

    amount = amount - props.endedAuctions.length;
    if (amount > 0) {
      return amount;
    } else {
      return 0;
    }
  }

  function calcWon() {
    let bids: IBid[] = [];
    let amount: number = 0;

    props.highBids.map((bid) => {
      if (bid.userId === userId) {
        // bids.push(bid);
        props.endedAuctions.map((auction) => {
          if (bid.auctionId === auction._id) {
            amount++;
          }
        });
      }
    });

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
          {props.ongoingAuctions.length == 0 &&
          props.endedAuctions.length == 0 ? (
            <>
              {/* <Link className="auctLink" to={"/auction/" + endSoon.objectID}> */}
                <div className="imgContainer">
                  <LoaderImage />
                </div>
              {/* </Link> */}
            </>
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
          <span>{calcLeading()}</span>
        </div>

        <div className="statBox">
          <span>Won</span>
          <span>{calcWon()}</span>
        </div>
      </div>
      <div className="account__section--user__logout">
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
};
