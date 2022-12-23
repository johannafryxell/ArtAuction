import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IArt } from "../../models/IArt";

interface IAuctionInfoProps {
  art: IArt;
}

export const AuctionInfo = (props: IAuctionInfoProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography>
        {props.art.title}
      </Typography>
    </Box>
  );
};
