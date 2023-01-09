import { createContext, ReactNode, useState } from "react";
import Cookies from "universal-cookie";

export interface IAuth {
  token: string | null;
  onLogin: (cookieToken: string) => void;
  onLogout: () => void;
}

interface IAuthContextProps {
  children?: ReactNode;
}

// const authDefault: IAuth = {
//   token: null,
//   onLogin: () => null,
//   onLogout: () => null,
// };
// export const AuthContext = createContext<IAuth>(authDefault);
export const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: IAuthContextProps) => {
  const cookies = new Cookies();

  const [token, setToken] = useState(cookies.get("logIn") || null);

  const handleLogin = async (cookieToken: string) => {
    // const token = cookies.get("logIn");

    // setToken(token);
    setToken(cookieToken);    
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export {  AuthProvider };

//V2
// export interface IAuth {
//   loggedIn: boolean;
//   token: string;
//   logIn: () => void;
//   logOut: () => void;
// }

// interface IAuthContextProps {
//     children?: ReactNode;
// }

// const authDefault: IAuth = {
//   loggedIn: false,
//   token: "",
//   logIn: () => null,
//   logOut: () => null,
// };

// export const AuthContext = createContext<IAuth>(authDefault);

// export const AuthProvider = ({ children }:IAuthContextProps) => {
//   const [auth, setAuth] = useState({
//     loggedIn: false,
//     token: "",
//   });

//   const logIn = () => {
//     setAuth((prevState) => ({
//       ...prevState,
//       loggedIn: true,
//     }));
//   };

//   const logOut = () => {
//     setAuth((prevState) => ({
//       ...prevState,
//       loggedIn: false,
//     }));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         ...auth,
//         logIn,
//         logOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// V3

// import { createContext, ReactNode, useReducer } from "react";

// export const AuthContext = createContext(null);

// interface IAuthContextProps {
//     children?: ReactNode;
// }

// export const authReducer = (state, action) => {
//     switch(action.type) {
//         case 'LOGIN':
//             return {user: action.payload}
//         case 'LOGOUT':
//             return {user:null}
//         default:
//             return state
//     }
// }

// export const AuthContextProvider: React.FC<IAuthContextProps> = ({children}) => {
//     const [state, dispatch] = useReducer(authReducer, {
//             user: null
//     })

//     console.log('AuthContext state: ', state);

//     return (
//         <AuthContext.Provider value={{...state, dispatch}}>
//             {children}
//         </AuthContext.Provider>
//     )

// }
