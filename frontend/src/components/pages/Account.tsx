import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, IAuth } from "../AuthProvider";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { IUser } from "../../interface/IUser";
import { AboutUser } from "../userComponents/AboutUser";
import { UserAuctions } from "../userComponents/UserAuctions";
import { useAuctions } from "../AuctionProvider";
import { IArtAuction } from "../../interface/IArtAuction";
import { IBid } from "../../interface/IBid";

export function Account() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext) as IAuth;
  const auctions = useAuctions().auctions;
  const ended = useAuctions().ended;

  const [ongoingAuctions, setOngoingAuctions] = useState<IArtAuction[]>([]);
  const [endedAuctions, setEndedAuctions] = useState<IArtAuction[]>([]);
  const [highBids, setHighBids] = useState<IBid[]>([]);

  const [user, setUser] = useState<IUser>({
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const getAuctions = async () => {
    const user: any = jwt(cookies.get("logIn"));

    let res: any = await axios.get(
      "http://localhost:3001/account/getuserauctions/?userId=" + user.id
    );
    const auctionIds = res.data.auctionIds; //Only auctions the user has placed bids on
    const bids: IBid[] = res.data.highBids;
    setHighBids(bids);

    let filteredOngoing = auctions.filter((obj) =>
      auctionIds.includes(obj._id)
    );
    let filteredEnded = ended.filter((obj) =>
      auctionIds.includes(obj._id)
    );

    setOngoingAuctions(filteredOngoing);
    setEndedAuctions(filteredEnded);
  };

  const getUser = async () => {
    const user = cookies.get("logIn");
    const body = jwt(user);

    let res: any = await axios.post("http://localhost:3001/account", body);
    setUser(res.data);
  };

  useEffect(() => {
    if (auth) {
      getUser();
      getAuctions();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <main className="account">
      {ongoingAuctions && (
        <>
          <AboutUser
            highBids={highBids}
            ongoingAuctions={ongoingAuctions}
            endedAuctions={endedAuctions}
            user={user}
            />
          <UserAuctions
            highBids={highBids}
            ongoingAuctions={ongoingAuctions}
            endedAuctions={endedAuctions}
            user={user}
          />
        </>
      )}
    </main>
  );
}
