import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IArt } from "../../models/IArt";

interface IAuctionInfoProps {
  art: IArt;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ flexDirection: "row" }}>
        <Typography sx={{ width: "20%", fontWeight: "bold" }} variant="body2">
          Title
        </Typography>
        <Typography variant="body2">
          {props.art.title ? props.art.title : "Unknown"}
        </Typography>
      </Box>
      <Typography variant="h6">
        {props.art.country ? props.art.country : "Unknown"}
      </Typography>
      <Typography variant="h6">
        {props.art.period ? props.art.period : "Unknown"}
      </Typography>
      <Typography variant="h6">
        {props.art.artistDisplayName ? props.art.artistDisplayName : "Unknown"}
      </Typography>
    </Box>
  );
};
