import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// INTERFACE //
import { IArtAuction } from "../../interface/IArtAuction";

// CONTEXT //
import { useAuctions } from "../AuctionProvider";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const auctions = useAuctions().auctions;

  const [quadArtList, setQuadArtList] = useState<IArtAuction[]>([]);
  const [artList, setArtList] = useState<IArtAuction[]>([]);
  const [firstArt, setFirstArt] = useState<IArtAuction>({
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

  useEffect(() => {
    setFirstArt(auctions[0]);
    setQuadArtList([auctions[1], auctions[2], auctions[3], auctions[4]]);
    setArtList(auctions.slice(5));
  }, []);

  return (
    <>
      <div className="home">
        <div className="home__top">
          <div className="home__top--first" key={firstArt.objectID}>
            <Link
              className="home__grid--auction__link"
              to={"/auction/" + firstArt.objectID}
            >
              <div className="imgContainer">
                <img src={firstArt.primaryImage} alt="artwork" />
              </div>
            </Link>
          </div>
          <div className="home__top--quad">
            {quadArtList.map((auction) => (
              <div className="home__top--quad__auction" key={auction.objectID}>
                <Link
                  className="home__grid--auction__link"
                  to={"/auction/" + auction.objectID}
                >
                  <div className="imgContainer">
                    <img src={auction.primaryImage} alt="artwork" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="home__grid">
          {artList.map((auction) => (
            <div className="home__grid--auction" key={auction.objectID}>
              <Link
                className="home__grid--auction__link"
                to={"/auction/" + auction.objectID}
              >
                <div className="imgContainer">
                  <img src={auction.primaryImage} alt="artwork" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
