import { createContext, ReactNode, useState } from "react";
import Cookies from "universal-cookie";

export interface IAuth {
  auth: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

interface IAuthContextProps {
  children?: ReactNode;
}

export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: IAuthContextProps) => {
  const cookies = new Cookies();

  //Sets token based on cookie
  function checkCookie() {
    if (cookies.get("logIn")) {
      return true;
    } else {
      return false;
    }
  }
  const [auth, setAuth] = useState(checkCookie());

  const handleLogin = async () => {
    setAuth(true);
  };

  const handleLogout = () => {
    setAuth(false);
    cookies.remove("logIn");
  };

  const value = {
    auth,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
