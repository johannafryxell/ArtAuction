import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
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
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={currentArt.primaryImage}
            alt="artwork"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {currentArt.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Grid container>
        {auctionList.map((auction) => (
          <Grid item key={auction.artId} xs={12} sm={true}>
            <Card>
              <CardContent>
                <Typography variant="h2" align="center">
                  {presentDay(auction.endTime)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
