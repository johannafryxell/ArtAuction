import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { IAuction } from "../../models/IAuction";

export function Home() {
  const [auctionList, setAuctionList] = useState<IAuction[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3001/art/getauctions").then((res) => {
      setAuctionList(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Grid container>
        {auctionList.map(auction => (
          <Grid item key={auction.artId} xs={12} sm={6} md={3}>
            <Paper>{auction.artId}</Paper>
          </Grid>
        ))}
      </Grid>
      <h1>Home</h1>
    </>
  );
}
