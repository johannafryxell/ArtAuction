import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { HomeLayout } from "./components/layouts/HomeLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { IArt, IArtCollection } from "./models/IArt";

function App() {
  const [artCollection, setArtCollection] = useState<IArtCollection>();

  useEffect(() => {
    
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
  
}, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
