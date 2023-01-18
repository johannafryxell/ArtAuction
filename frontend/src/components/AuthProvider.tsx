import { createContext, ReactNode, useState } from "react";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";

export interface IAuth {
  auth: boolean;
  userId: string,
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

  function setUser() {
    const userToken = cookies.get("logIn");
    if(userToken){
      const decoded: any = jwt(userToken);
      return decoded.id
    }
  }

  const [auth, setAuth] = useState(checkCookie());
  const [userId, setUserId] = useState(setUser());

  const handleLogin = async () => {
    setAuth(true);
    setUserId(setUser());
  };

  const handleLogout = () => {
    setAuth(false);
    cookies.remove("logIn");
  };

  const value = {
    auth,
    userId,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

