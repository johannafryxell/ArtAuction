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
    <>
      <div className="detail__artinfo--box">
        <div>
          <div>
            <span>Auction closes</span>
            <span>{props.auction.endTime}</span>
          </div>
          <div>
            <span>Current bid</span>
            <span>*highest bid*</span>
          </div>
          <div>
            <input type="text" />
            <button>Place Bid</button>
          </div>
          <div>
            <span>Bid history</span>
            {/* Utfällbart grej */}
          </div>
        </div>
      </div>
    </>
  );
};
