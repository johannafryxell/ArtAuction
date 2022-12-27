import axios from "axios";
import { useEffect, useState } from "react";
import { IArt } from "../../models/IArt";
import { IAuction } from "../../models/IAuction";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);
  const [todaysArtId, setTodaysArtId] = useState();
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
      setTodaysArtId(res.data.artId);
      console.log("Get todays auction" + res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
          todaysArtId
      )
      .then((result) => {
        console.log(result.data.primaryImage);
        setCurrentArt(result.data);
      });
  }, [todaysArtId]);

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
          <img src={currentArt.primaryImage} alt="artwork" />
          <h3>{currentArt.title}</h3>
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
