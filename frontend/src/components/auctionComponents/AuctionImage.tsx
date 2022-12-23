import Box from "@mui/material/Box";
import { IArt } from "../../models/IArt";

interface IImageProps {
  art: IArt;
}

export const AuctionImage = (props: IImageProps) => {
  return (
    <>
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt={props.art.objectName}
        src={props.art.primaryImage}
      />
    </>
  );
};
