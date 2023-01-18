import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/main.scss";

// PAGES //
import { Home } from "./components/pages/Home";
import { Account } from "./components/pages/Account";
import { Login } from "./components/pages/Login";
import { Detail } from "./components/pages/Detail";
import { NotFound } from "./components/pages/NotFound";
import { BaseLayout } from "./components/layouts/BaseLayout";

// CONTEXT //
import { useAuctions } from "./components/AuctionProvider";
import { LoaderGrid } from "./components/loaders/LoaderGrid";

function App() {
  const auctions = useAuctions().auctions;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            {auctions.length != 0 && (
              <Route path="/" element={<Home />}></Route>
            )}
          </Route>
          <Route path="/auction" element={<BaseLayout />}>
            {auctions.length != 0 && (
              <Route path="/auction/:id" element={<Detail />}></Route>
            )}
          </Route>
          <Route path="/login" element={<BaseLayout />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route path="/account" element={<BaseLayout />}>
            {auctions.length != 0 ? (
              <Route path="/account" element={<Account />}></Route>
            ) : (
              <Route path="/account" element={<LoaderGrid />}></Route>
            )}
          </Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
