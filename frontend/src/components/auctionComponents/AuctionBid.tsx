import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IAuction } from "../../models/IAuction";

interface IAuctionBidProps {
  auction: IAuction;
}

export const AuctionBid = (props: IAuctionBidProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        border: 1,
        padding: 5,
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography display="inline">Auction closes</Typography>
          <Typography display="inline">{props.auction.endTime}</Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography display="inline">Current bid</Typography>
          <Typography display="inline">*highest bid*</Typography>
        </Box>
      </Box>

      <FormGroup row>
        <TextField id="outlined-input" />
        <Button variant="contained" disableElevation>
          Place Bid
        </Button>
      </FormGroup>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography display={"inline"}>Bid history</Typography>

        <Box component={"div"}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Bid history</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>List of bids</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};
