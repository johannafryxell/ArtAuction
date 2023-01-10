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
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__menu--linkActive" : "header__menu--link"
            }
            to="/auction"
          >
            Current Auction
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "header__menu--linkActive" : "header__menu--link"
            }
            to={auth ? "/login" : "/account"}
          >
            {auth ? "Login" : "Account"}
          </NavLink>
        </nav>
        <div className="header__logo">
          <h1>ART AUCTION</h1>
        </div>
      </header>
    </>
  );
}
