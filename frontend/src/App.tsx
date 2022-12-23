import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { HomeLayout } from "./components/layouts/HomeLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IArt, IArtCollection } from "./models/IArt";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

////////////////
// MUI THEME //
//////////////
const theme = createTheme({
  palette: {
    primary: {
      main: "#DBD8D4",
    },
  },
});

function App() {
  const [todaysAuction, setTodaysAuction] = useState(null);

  //////////////////
  // ART CONTEXT //
  ////////////////
  // useEffect(() => {
  //   axios.get("http://localhost:3001/art/gettodaysauction").then((res) => {
  //     setTodaysAuction(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //Gets id:s for objects with images
  // axios
  //   .get<IArtCollection>("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir")
  //   .then((result) => {
  //     console.log(result);
  //   });
  //Gets object
  // axios
  //   .get("https://collectionapi.metmuseum.org/public/collection/v1/objects/435962")
  //   .then((result) => {
  //     console.log(result.data);
  //   });
  // }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
