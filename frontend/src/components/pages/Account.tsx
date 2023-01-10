import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AuthContext, IAuth } from "../AuthProvider";
import jwt from "jwt-decode";
import { IUser } from "../../models/IUser";

export function Account() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext) as IAuth;

  const [user, setUser] = useState<IUser>({
    _id: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const getUser = async () => {
    const user = cookies.get("logIn");
    const body = jwt(user);

    let res: any = await axios.post("http://localhost:3001/account", body);
    setUser(res.data);
  };

  useEffect(() => {
    if (auth) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <h1>Account</h1>
      <span>{user.firstName}</span>
    </>
  );
}
