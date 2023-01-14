import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/main.scss";

// PAGES //
import { Home } from "./components/pages/Home";
import { Account } from "./components/pages/Account";
import { Login } from "./components/pages/Login";
import { Detail } from "./components/pages/Detail";

// LAYOUTS //
import { HomeLayout } from "./components/layouts/HomeLayout";
import { DetailLayout } from "./components/layouts/DetailLayout";
import { LoginLayout } from "./components/layouts/LoginLayout";
import { AccountLayout } from "./components/layouts/AccountLayout";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IArtCollection } from "./models/IArt";
import { useAuctions } from "./components/AuctionProvider";

function App() {
  const auctions = useAuctions().auctions;

  // useEffect(() => {
  // // Gets id:s for objects with images
  // axios
  //   .get<IArtCollection>("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir")
  //   .then((result) => {
  //     console.log(result);
  //   });
  // }
  // )

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            {auctions.length != 0 && (
              <Route path="/" element={<Home />}></Route>
            )}
          </Route>
          <Route path="/auction" element={<DetailLayout />}>
            {auctions.length != 0 && (
              <Route path="/auction/:id" element={<Detail />}></Route>
            )}
          </Route>
          <Route path="/login" element={<LoginLayout />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route path="/account" element={<AccountLayout />}>
            {auctions.length != 0 && (
              <Route path="/account" element={<Account />}></Route>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
