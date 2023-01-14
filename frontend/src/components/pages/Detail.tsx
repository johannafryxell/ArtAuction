import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArt } from "../../models/IArt";
import { IArtAuction } from "../../models/IArtAuction";
import { IAuction } from "../../models/IAuction";
import { AuctionBid } from "../auctionComponents/AuctionBid";
import { AuctionImage } from "../auctionComponents/AuctionImage";
import { AuctionInfo } from "../auctionComponents/AuctionInfo";
import { BidInfo } from "../auctionComponents/BidInfo";
import { useAuctions } from "../AuctionProvider";

export function Detail() {
  const auctions = useAuctions().auctions;
  const [auction, setAuction] = useState<IArtAuction>({
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

  const [id, setId] = useState(useParams().id || 0);
  const [ended, setEnded] = useState<boolean>(false);
  // const [auction, setAuction] = useState<IAuction>({
  //   _id: "",
  //   artId: 0,
  //   published: "",
  //   endTime: new Date(),
  //   price: 0,
  // });
  // const [art, setArt] = useState<IArt>({
  //   objectID: "",
  //   primaryImage: "",
  //   objectName: "",
  //   title: "",
  //   country: "",
  //   artistDisplayName: "",
  //   period: "",
  //   accessionYear: "",
  //   artistDisplayBio: "",
  // });
  ////////////////
  // FUNCTIONS //
  //////////////
  function calcEndTime() {
    let endTime = auction.endTime.toLocaleString();
    let today = new Date().toLocaleString();

    if (new Date(today) >= new Date(endTime)) {
      setEnded(true);
    } else {
      setEnded(false);
    }
  }

  const getAuction = async () => {
    const object:any = auctions.find(({objectID}) => objectID === +id);
    setAuction(object);

    // axios
    //   .get("http://localhost:3001/art/getsingleauction?id=" + id)
    //   .then((res) => {
    //     if (res.data === "error") {
    //       console.log("error: " + res.data);
    //     } else {
    //       setAuction(res.data.auction);
    //     }
    // });
  };

  //////////////////
  // USE EFFECTS //
  ////////////////
  useEffect(() => {
    getAuction();
    calcEndTime();
  }, []);

  useEffect(() => {
    calcEndTime();
  }, [auction]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id
  //     )
  //     .then((result) => {
  //       setArt(result.data);
  //     });
  // }, [auction]);

  return (
    <>
      <main className="detail">
        <div className="detail__artwork">
          <AuctionImage image={auction.primaryImage} name={auction.objectName}></AuctionImage>
        </div>
        <div className="detail__artinfo">
          <AuctionBid auction={auction}></AuctionBid>
          {/* {!ended && <AuctionBid auction={auction}></AuctionBid>}
          {ended && (
            <div className="detail__artinfo--box">
              <span>This auction has ended</span>
            </div>
          )} */}
          <AuctionInfo auction={auction}></AuctionInfo>
          <BidInfo />
          <AuctionInfo auction={auction}></AuctionInfo>
        </div>
      </main>
    </>
  );
}
