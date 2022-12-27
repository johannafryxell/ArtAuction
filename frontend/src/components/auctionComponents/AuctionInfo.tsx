import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IArt } from "../../models/IArt";

interface IAuctionInfoProps {
  art: IArt;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
      
    <Box sx={{ height: 300, borderLeft: 1, borderRight: 1, borderBottom: 1,padding: 5 }}>
      <Typography variant="body2" display="inline">
        {props.art.title ? props.art.title : "Unknown"}
      </Typography>
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
