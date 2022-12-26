import Box from "@mui/material/Box";
import { IArt } from "../../models/IArt";

interface IAuctionImageProps {
  art: IArt;
}

export const AuctionImage = (props: IAuctionImageProps) => {
  return (
    <Box
      sx={{
        height: 500,
        width: 500,
      }}
    >
      <Box
        component="img"
        sx={
          {
            height: "100%",
            width: "100%",
          }
        }
        alt={props.art.objectName}
        src={props.art.primaryImage}
      />
    </Box>
  );
};
