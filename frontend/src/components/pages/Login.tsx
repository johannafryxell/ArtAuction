import { useState } from "react";
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
        updFirstName = {updFirstName}
        updLastName = {updLastName}
        updEmail = {updEmail}
        updPassword = {updPassword}
        updConfirmPassword = {updConfirmPassword}
        signUp = {signUp}
      />
    </main>
  );
}
