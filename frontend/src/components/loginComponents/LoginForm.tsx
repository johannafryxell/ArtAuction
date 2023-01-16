import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";
import { ISigninUser } from "../../models/IUser";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { AuthContext, IAuth } from "../AuthProvider";

export const LoginForm = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  /////////////////////
  // CONTEXT VALUES //
  ///////////////////
  const { auth } = useContext(AuthContext) as IAuth;
  const { onLogin } = useContext(AuthContext) as IAuth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwErr, setPasswErr] = useState("");

  function validateForm() {
    if (email == "") {
      setEmailErr("Email required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr("Invalid email");
    } else {
      setEmailErr("");
    }

    if (password == "") {
      setPasswErr("Password required");
    } else {
      setPasswErr("");
    }
  }

  const logIn = async (e: any) => {
    e.preventDefault();
    let body: ISigninUser = {
      email: email,
      password: password,
    };
    validateForm()

    try {
      let res: any = await axios.post(
        "http://localhost:3001/login/sign-in",
        body
      );
      console.log(res.data);
      
      if (res.data.signIn) {
        cookies.set("logIn", res.data.token);
        onLogin();
        navigate("/");
      } else {
        setEmailErr("Wrong email or password");
      }
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  return (
    <>
      <form
        action="login/sign-in"
        className="login-page__section login-page__section--form"
      >
        {emailErr != "" && (
          <div className="error">
            <span className="error__text">{emailErr}</span>
          </div>
        )}
        <div className="form__input">
          <input
            type="text"
            name="email"
            id="email"
            className="form__input--text"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="email" className="form__input--title">
            Email
          </label>
        </div>
        {passwErr != "" && (
          <div className="error">
            <span className="error__text">{passwErr}</span>
          </div>
        )}
        <div className="form__input">
          <input
            type="password"
            name="password"
            id="password"
            className="form__input--text"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className="form__input--title">
            Password
          </label>
        </div>
        <div className="form__input">
          <input
            type="submit"
            className="form__input--btn"
            value="Sign in"
            onClick={logIn}
          />
        </div>
      </form>
    </>
  );
};
