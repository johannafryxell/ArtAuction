import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext, IAuth } from "../AuthProvider";

export function Header() {
  const { auth } = useContext(AuthContext) as IAuth;

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
            to="/auction"
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
          {/* <h1>ALTERNATIVE AUCTION</h1> */}
          <h1>
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
              <span> </span>
              <span>A</span>
              <span>U</span>
              <span>C</span>
              <span>T</span>
              <span>I</span>
              <span>O</span>
              <span>N</span>
          </h1>
        </div>
      </header>
    </>
  );
}
