import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuctions } from "../AuctionProvider";
import { AuthContext, IAuth } from "../AuthProvider";

export function Header() {
  const { auth } = useContext(AuthContext) as IAuth;
  const [artId, setArtId] = useState(0);
  const auctions = useAuctions().auctions;

  useEffect(() => {
    if (auctions.length != 0) {
      setArtId(auctions[0].artId);
    }
  }, [auctions]);

  return (
    <>
      <header className="header">
        <nav className="header__menu">
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__menu--linkActive" : "header__menu--link"
            }
            to="/"
          >
            Home
          </NavLink>
          <span>/</span>
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__menu--linkActive" : "header__menu--link"
            }
            to={"/auction/" + artId}
          >
            Current Auction
          </NavLink>
          <span>/</span>

          <NavLink
            className={({ isActive }) =>
              isActive ? "header__menu--linkActive" : "header__menu--link"
            }
            to={auth ? "/account" : "/login"}
          >
            {auth ? "Account" : "Login"}
          </NavLink>
        </nav>
        <div className="header__logo">

          <h1>
            <span>T</span>
            <span>H</span>
            <span>E</span>
            <span> </span>
            <span className="diffLetter">A</span>
            <span className="diffLetter">R</span>
            <span className="diffLetter">T</span>
            <span>E</span>
            <span>R</span>
            <span>N</span>
            <span>A</span>
            <span>T</span>
            <span>I</span>
            <span>V</span>
            <span>E</span>
          </h1>
        </div>
      </header>
    </>
  );
}
