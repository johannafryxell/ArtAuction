import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IArtAuction } from "../models/IArtAuction";

export interface IAuctionProvider {
  auctions: IArtAuction[];
}

interface IAuctionContextProps {
  children?: ReactNode;
}

// const AuctionContext = createContext<IAuctionProvider | null>(null);
const AuctionContext = createContext<IAuctionProvider>({ auctions: [] });

export const ArtProvider = ({ children }: IAuctionContextProps) => {
  const [auctions, setAuctions] = useState<IArtAuction[]>([]);
  // const [auctions, setAuctions] = useState<IAuctionProvider>();

  const getArtwork = async () => {
    axios.get("http://localhost:3001/art/getartwork").then((res) => {
      const list : IArtAuction[] = res.data;
      setAuctions(list);
      // console.log(list);
      
    });
  };

  useEffect(() => {
    if(auctions.length === 0){
      getArtwork();
    }
  }, []);

  const value = {
    auctions
  };

  return (
    <AuctionContext.Provider value={value}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctions = () => useContext(AuctionContext);
