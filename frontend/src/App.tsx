import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { HomeLayout } from "./components/layouts/HomeLayout";
import { DetailLayout } from "./components/layouts/DetailLayout";
import { Detail } from "./components/pages/Detail";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./scss/main.scss";

////////////////
// MUI THEME //
//////////////
const theme = createTheme({
  palette: {
    primary: {
      light: "#EDEBE9",
      main: "#D1CDC7",
      dark: "#877A6E"
    },
  },
});

function App() {
  // useEffect(() => {
  //Gets id:s for objects with images
  // axios
  //   .get<IArtCollection>("https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir")
  //   .then((result) => {
  //     console.log(result);
  //   });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeLayout />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
              <Route path="/auction" element={<DetailLayout />}>
                <Route path="/auction/:id" element={<Detail />}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
