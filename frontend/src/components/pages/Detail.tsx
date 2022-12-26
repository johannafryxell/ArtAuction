import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArt } from "../../models/IArt";
import { IAuction } from "../../models/IAuction";
import { AuctionBid } from "../auctionComponents/AuctionBid";
import { AuctionImage } from "../auctionComponents/AuctionImage";
import { AuctionInfo } from "../auctionComponents/AuctionInfo";

export function Detail() {
  const [id, setId] = useState(useParams().id);
  const [endsToday, setEndsToday] = useState<boolean>(false);
  const [auction, setAuction] = useState<IAuction>({
    artId: 0,
    published: "",
    endTime: "",
    bidList: [],
  });
  const [art, setArt] = useState<IArt>({
    objectId: "",
    primaryImage: "",
    objectName: "",
    title: "",
    country: "",
    artistDisplayName: "",
    period: "",
  });

  //////////////////
  // USE EFFECTS //
  ////////////////
  useEffect(() => {
    axios
      .get("http://localhost:3001/art/getsingleauction?id=" + id)
      .then((res) => {
        if (res.data === "error") {
          console.log("error: " + res.data);
        } else {
          setAuction(res.data.auction);
          checkToday(res.data.today);
          console.log(res.data);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
          auction.artId
      )
      .then((result) => {
        console.log(result.data.primaryImage);
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
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        container
      >
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={true}
          item
        >
          <AuctionImage art={art}></AuctionImage>
        </Grid>
        <Grid item>
          <Box style={{ maxHeight: "85vh", overflow: "auto" }}>
            <AuctionBid auction={auction}></AuctionBid>
            <AuctionInfo art={art}></AuctionInfo>
            <AuctionInfo art={art}></AuctionInfo>
            <AuctionInfo art={art}></AuctionInfo>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
