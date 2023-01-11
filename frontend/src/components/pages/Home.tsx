import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IArt } from "../../models/IArt";
import { IAuction } from "../../models/IAuction";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const [quadArtList, setQuadArtList] = useState<IArt[]>([]);
  const [artList, setArtList] = useState<IArt[]>([]);
  const [firstArt, setFirstArt] = useState<IArt>({
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

  /////////////////
  // USEEFFECTS //
  ///////////////

  useEffect(() => {
    axios.get("http://localhost:3001/art/getartwork").then((res) => {
      const list = res.data;
      setFirstArt(list[0]);
      setQuadArtList([list[1], list[2], list[3], list[4]]);
      setArtList(list.slice(5));
      // setArtList(list)
    });
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
              <img src={firstArt.primaryImage} alt="artwork" />
            </Link>
          </div>
          <div className="home__top--quad">
            {quadArtList.map((auction) => (
              <div className="home__top--quad__auction" key={auction.objectID}>
                <Link
                  className="home__grid--auction__link"
                  to={"/auction/" + auction.objectID}
                >
                  <img src={auction.primaryImage} alt="artwork" />
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
                <img src={auction.primaryImage} alt="artwork" />
              </Link>
              <span>{auction.objectID}</span>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="home">
        <div className="home__today">
          <div className="home__today--image">
            <img src={currentArt.primaryImage} alt="artwork" />
          </div>
        </div>
        <div className="home__grid">
        {artList.map((auction) => (
            <div className="home__grid--auction" key={auction.objectID}>
              <h2>{auction.title}</h2>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}
