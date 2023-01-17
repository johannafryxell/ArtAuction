import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// INTERFACE //
import { IArtAuction } from "../../interface/IArtAuction";

// COMPONENTS //
import { AuctionBid } from "../auctionComponents/AuctionBid";
import { AuctionImage } from "../auctionComponents/AuctionImage";
import { AuctionInfo } from "../auctionComponents/AuctionInfo";
import { BidInfo } from "../auctionComponents/BidInfo";
import { Suggestion } from "../auctionComponents/Suggestion";

// CONTEXT //
import { useAuctions } from "../AuctionProvider";

export function Detail() {
  const auctions = useAuctions().auctions;
  const endedAuctions = useAuctions().ended;
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

  const [id, setId] = useState<number>(+(useParams().id || 0));

  ////////////////
  // FUNCTIONS //
  //////////////

  const getAuction = async () => {
    console.log("Get auction");

    const object: any = auctions.find(({ objectID }) => objectID === +id);
    if (object) {
      setAuction(object);
    } else {
      const endedObject: any = endedAuctions.find(
        ({ objectID }) => objectID === +id
      );
      setAuction(endedObject);
    }
  };

  //////////////////
  // USE EFFECTS //
  ////////////////
  useEffect(() => {
    getAuction();
  }, [id]);

  return (
    <>
      <main className="detail">
        <div className="detail__artwork">
          <AuctionImage
            image={auction.primaryImage}
            name={auction.objectName}
          ></AuctionImage>
        </div>
        <div className="detail__artinfo">
          <AuctionBid auction={auction}></AuctionBid>
          <AuctionInfo auction={auction}></AuctionInfo>
          <BidInfo />
          <Suggestion setId={setId} />
        </div>
      </main>
    </>
  );
}
