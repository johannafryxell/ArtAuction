import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { ISignupUser } from "../../interface/IUser";
import { AuthContext, IAuth } from "../AuthProvider";

export const SignupForm = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  /////////////////////
  // CONTEXT VALUES //
  ///////////////////
  const { onLogin } = useContext(AuthContext) as IAuth;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateForm() {
    let error = false;

    if (firstName.trim() == "" || null) {
      setFirstError("Required");
      error = true;
    } else {
      setFirstError("");
    }

    if (lastName.trim() == "" || null) {
      setLastError("Required");
      error = true;
    } else {
      setLastError("");
    }

    if (email.trim() == "" || null) {
      setEmailError("Required");
      error = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Invalid email");
      error = true;
    } else {
      setEmailError("");
    }

    if (
      password.trim() === "" ||
      null ||
      confirmPassword.trim() === "" ||
      null
    ) {
      setPasswordError("Both password fields required");
      error = true;
    } else {
      setPasswordError("");
    }

    if (!error) {
      return true;
    } else {
      return false;
    }
  }

  const signUp = async (e: any) => {
    e.preventDefault();
    let body: ISignupUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    if (validateForm()) {
      try {
        let res = await axios.post("http://localhost:3001/login/sign-up", body);
        if (res.data === "exist") {
          setEmailError("This email is already in use");
        }
        if (res.data === "noMatch") {
          setPasswordError("Write same password in both fields");
        } else if (res.data.signIn) {
          cookies.set("logIn", res.data.token);
          onLogin();
          navigate("/account");
        }
      } catch (err) {
        console.log("error");
        console.log(err);
      }
    }
  };

  return (
    <>
      <form className="login-page__section login-page__section--form">
        {firstError != "" && (
          <div className="error">
            <span className="error__text">{firstError}</span>
          </div>
        )}
        <div className="form__input">
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form__input--text"
            placeholder=" "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="firstName" className="form__input--title">
            First name
          </label>
        </div>
        {lastError != "" && (
          <div className="error">
            <span className="error__text">{lastError}</span>
          </div>
        )}
        <div className="form__input">
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="form__input--text"
            placeholder=" "
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor="lastName" className="form__input--title">
            Last name
          </label>
        </div>
        {emailError != "" && (
          <div className="error">
            <span className="error__text">{emailError}</span>
          </div>
        )}
        <div className="form__input">
          <input
            type="email"
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
        {passwordError != "" && (
          <div className="error">
            <span className="error__text">{passwordError}</span>
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
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form__input--text"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword" className="form__input--title">
            Repeat password
          </label>
        </div>
        <div className="form__input">
          <input
            type="submit"
            className="form__input--btn"
            value="Sign up"
            onClick={signUp}
          />
        </div>
      </form>
    </>
  );
};
