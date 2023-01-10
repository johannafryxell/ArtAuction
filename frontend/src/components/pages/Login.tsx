import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISigninUser, ISignupUser, IUser } from "../../models/IUser";
import { LoginForm } from "../loginComponents/LoginForm";
import { SignupForm } from "../loginComponents/SignupForm";

import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { AuthContext, IAuth } from "../AuthProvider";

export function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpView, setSignUpView] = useState(false);

  const navigate = useNavigate();
  const cookies = new Cookies();
  /////////////////////
  // CONTEXT VALUES //
  ///////////////////
  const { auth } = useContext(AuthContext) as IAuth;
  const { onLogin } = useContext(AuthContext) as IAuth;

  ///////////////////////
  // UPDATE FUNCTIONS //
  /////////////////////
  const updSignupView = () => {
    setSignUpView(!signUpView);
  };
  const updFirstName = (name: string) => {
    setFirstName(name);
  };
  const updLastName = (name: string) => {
    setLastName(name);
  };
  const updEmail = (email: string) => {
    setEmail(email);
  };
  const updPassword = (email: string) => {
    setPassword(email);
  };
  const updConfirmPassword = (email: string) => {
    setConfirmPassword(email);
  };

  //////////////////////
  // LOGIN FUNCTIONS //
  ////////////////////
  const signUp = async (e: any) => {
    e.preventDefault();
    let body: ISignupUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(body);
    try {
      console.log("trying...");
      let res = await axios.post("http://localhost:3001/login/sign-up", body);
    } catch (err) {
      console.log("error");
      console.log(err);
    }

    // navigate("/");
  };

  const logIn = async (e: any) => {
    e.preventDefault();
    let body: ISigninUser = {
      email: email,
      password: password,
    };

    try {
      let res: any = await axios.post(
        "http://localhost:3001/login/sign-in",
        body
      );
      cookies.set("logIn", res.data.token);

      onLogin();
      navigate("/");

      const decoded = jwt(res.data.token);
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  return (
    <main className="login-page">
      {signUpView ? (
        <SignupForm
          email={email}
          firstName={firstName}
          lastName={lastName}
          password={password}
          confirmPassword={confirmPassword}
          updFirstName={updFirstName}
          updLastName={updLastName}
          updEmail={updEmail}
          updPassword={updPassword}
          updConfirmPassword={updConfirmPassword}
          signUp={signUp}
        />
      ) : (
        <LoginForm
          email={email}
          password={password}
          updEmail={updEmail}
          updPassword={updPassword}
          logIn={logIn}
        />
      )}
      {/* <LoginForm /> */}
      <div className="login-page__section login-page__section--registerView">
        <span className="registerView__text">
          {signUpView ? "Already have an account?" : "Don't have an account?"}
        </span>
        <button className="registerView__btn" onClick={updSignupView}>
          {signUpView ? "Sign in" : "Sign up"}
        </button>
      </div>
    </main>
  );
}
