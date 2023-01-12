import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArt } from "../../models/IArt";
import { IAuction } from "../../models/IAuction";
import { AuctionBid } from "../auctionComponents/AuctionBid";
import { AuctionImage } from "../auctionComponents/AuctionImage";
import { AuctionInfo } from "../auctionComponents/AuctionInfo";
import { BidInfo } from "../auctionComponents/BidInfo";

export function Detail() {
  const [id, setId] = useState(useParams().id);
  const [endsToday, setEndsToday] = useState<boolean>(false);
  const [auction, setAuction] = useState<IAuction>({
    _id: "",
    artId: 0,
    published: "",
    endTime: "",
    price: 0,
  });
  const [art, setArt] = useState<IArt>({
    objectID: "",
    primaryImage: "",
    objectName: "",
    title: "",
    country: "",
    artistDisplayName: "",
    period: "",
    accessionYear: "",
    artistDisplayBio: "",
  });

  const getAuction = async () => {
    axios
      .get("http://localhost:3001/art/getsingleauction?id=" + id)
      .then((res) => {
        if (res.data === "error") {
          console.log("error: " + res.data);
        } else {
          setAuction(res.data.auction);
          checkToday(res.data.today);
        }
      });
  };

  //////////////////
  // USE EFFECTS //
  ////////////////

  useEffect(() => {
    getAuction();
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id
      )
      .then((result) => {
        setArt(result.data);
      });
  }, [auction]);

  ////////////////
  // FUNCTIONS //
  //////////////
  function checkToday(today: boolean) {
    if (today) {
      setEndsToday(true);
    } else {
      setEndsToday(false);
    }
  }

  return (
    <>
      <main className="detail">
        <div className="detail__artwork">
          <AuctionImage art={art}></AuctionImage>
        </div>
        <div className="detail__artinfo">
          <AuctionBid auction={auction}></AuctionBid>
          <AuctionInfo art={art}></AuctionInfo>
          <BidInfo />
          <AuctionInfo art={art}></AuctionInfo>
        </div>
      </main>
    </>
  );
}
