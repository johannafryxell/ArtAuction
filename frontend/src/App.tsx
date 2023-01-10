import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { HomeLayout } from "./components/layouts/HomeLayout";
import { DetailLayout } from "./components/layouts/DetailLayout";
import { LoginLayout } from "./components/layouts/LoginLayout";
import { Detail } from "./components/pages/Detail";
import { Login } from "./components/pages/Login";
import "./scss/main.scss";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { IArtCollection } from "./models/IArt";

import { AuthProvider } from "../src/components/AuthProvider"

function App() {
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
      {/* <AuthContext.Provider> */}
      <AuthProvider>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
            <Route path="/auction" element={<DetailLayout />}>
              <Route path="/auction/:id" element={<Detail />}></Route>
            </Route>
            <Route path="/login" element={<LoginLayout />}>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      {/* </AuthContext.Provider> */}
    </>
  );
}

export default App;
