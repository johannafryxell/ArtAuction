import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  //Nu kollar den inte om det finns en cookie vid inlogg
  const [auth, setAuth] = useState(false);

  const handleLogin = async () => {
    setAuth(true);
  };

  const handleLogout = () => {
    setAuth(false);
  };

  const value = {
    auth,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};