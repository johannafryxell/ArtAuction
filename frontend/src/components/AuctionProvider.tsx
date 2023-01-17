import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IArtAuction } from "../interface/IArtAuction";

export interface IAuctionProvider {
  auctions: IArtAuction[];
  ended: IArtAuction[];
}

interface IAuctionContextProps {
  children?: ReactNode;
}

// const AuctionContext = createContext<IAuctionProvider | null>(null);
const AuctionContext = createContext<IAuctionProvider>({ auctions: [], ended: [] });

export const ArtProvider = ({ children }: IAuctionContextProps) => {
  const [auctions, setAuctions] = useState<IArtAuction[]>([]);
  const [ended, setEnded] = useState<IArtAuction[]>([]);
  // const [auctions, setAuctions] = useState<IAuctionProvider>();

  const getArtwork = async () => {
    axios.get("http://localhost:3001/art/getartwork").then((res) => {
      const ongoing : IArtAuction[] = res.data.ongoing;
      const endedList: IArtAuction[] = res.data.ended;
      setAuctions(ongoing);
      setEnded(endedList);
    });
  };

  useEffect(() => {    
      getArtwork();
  }, []);

  const value = {
    auctions,
    ended
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctions = () => useContext(AuctionContext);
