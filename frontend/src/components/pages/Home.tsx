import axios from "axios";
import { useEffect, useState } from "react";
import { IArt } from "../../models/IArt";
import { IAuction } from "../../models/IAuction";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);
  const [currentArt, setCurrentArt] = useState<IArt>({
    objectId: "",
    primaryImage: "",
    objectName: "",
    title: "",
    country: "",
    artistDisplayName: "",
    period: "",
  });

  /////////////////
  // USEEFFECTS //
  ///////////////
  useEffect(() => {
    axios.get("http://localhost:3001/art/getauctions").then((res) => {
      setAuctionList(res.data);
      console.log("Get auctions" + res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/art/gettodaysauction").then((res) => {
      setCurrentArt(res.data);
      console.log("primary" + res.data.primaryImage);
    });
  }, []);

  ////////////////
  // FUNCTIONS //
  //////////////
  function presentDay(date: string) {
    const weekday = ["S", "M", "T", "W", "T", "F", "S"];

    const d = new Date(date);
    let day = weekday[d.getDay()];
    return day;
  }

  return (
    <>
      <div className="home">
        <div className="home__today">
          <div className="home__today--info">
            <h3>{currentArt.title}</h3>
          </div>
          <div className="home__today--image">
            <img src={currentArt.primaryImage} alt="artwork" />
          </div>
        </div>
        <div className="home__week">
          {auctionList.map((auction) => (
            <div className="home__week--day" key={auction.artId}>
              <h2>{presentDay(auction.endTime)}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
