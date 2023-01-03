import axios from "axios";
import { useState } from "react";
import { ISignupUser, IUser } from "../../models/IUser";
import { LoginForm } from "../loginComponents/LoginForm";
import { SignupForm } from "../loginComponents/SignupForm";

export function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const signUp = async () => {
    let success = false;

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
      success = true;
    } catch (err) {
      console.log("error");
      console.log(err);
    }
  };

  return (
    <main className="login-page">
      {/* <LoginForm /> */}
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
    </main>
  );
}
