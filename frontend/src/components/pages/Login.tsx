import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISigninUser, ISignupUser, IUser } from "../../models/IUser";
import { LoginForm } from "../loginComponents/LoginForm";
import { SignupForm } from "../loginComponents/SignupForm";

export function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUpView, setSignUpView] = useState(false);

  const navigate = useNavigate();

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

  const signUp = async (e: any) => {
    // let success = false;
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
      console.log("signup posted:", res);
      // success = true;
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
      let res:any = await axios.post("http://localhost:3001/login/sign-in", body);
      console.log("signin posted:", res.data.signIn);
      // success = true;
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
