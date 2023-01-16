import axios from "axios";
import { useState } from "react";
import { ISignupUser } from "../../models/IUser";

export const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  };

  return (
    <>
      <form className="login-page__section login-page__section--form">
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
