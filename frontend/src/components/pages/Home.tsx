import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { IAuction } from "../../models/IAuction";

export function Home() {
  ////////////////
  // USESTATES //
  //////////////
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);
  const [currentAuction, setCurrentAuction] = useState<IAuction>();

  /////////////////
  // USEEFFECTS //
  ///////////////
  useEffect(() => {
    axios.get("http://localhost:3001/art/getauctions").then((res) => {
      setAuctionList(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/art/gettodaysauction").then((res) => {
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/435962"
      )
      .then((result) => {
        console.log(result.data);
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
      <Card></Card>
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
