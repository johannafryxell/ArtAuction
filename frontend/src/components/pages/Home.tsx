import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IArt } from "../../models/IArt";
import { IArtAuction } from "../../models/IArtAuction";
import { IAuction } from "../../models/IAuction";
import { SkeletonImage } from "../layoutComponents/LoaderImage";
import { LoaderSkeleton } from "../layoutComponents/LoaderSkeleton";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const [quadArtList, setQuadArtList] = useState<IArtAuction[]>([]);
  const [artList, setArtList] = useState<IArtAuction[]>([]);
  const [firstArt, setFirstArt] = useState<IArtAuction>({
    _id: "",
    artId: 0,
    published: "",
    endTime: "",
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

  /////////////////
  // USEEFFECTS //
  ///////////////
  const getArtwork = async () => {
    axios.get("http://localhost:3001/art/getartwork?ended=" + false).then((res) => {
      const list = res.data;
      console.log(list[0]);
      list.map((art: any) => {
        console.log(art.objectID);
      });

      setFirstArt(list[0]);
      setQuadArtList([list[1], list[2], list[3], list[4]]);
      setArtList(list.slice(5));
      // setArtList(list)
    });
  };

  useEffect(() => {
    getArtwork();
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
              {firstArt.objectID != 0 ? (
                <img src={firstArt.primaryImage} alt="artwork" />
              ) : (
                <LoaderSkeleton type="img" />
              )}
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
