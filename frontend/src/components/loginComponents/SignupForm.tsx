import axios from "axios";
import { ChangeEvent, useState } from "react";

interface ISignupFormProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  updFirstName: (firstName: string) => void;
  updLastName: (lastName: string) => void;
  updEmail: (email: string) => void;
  updPassword: (password: string) => void;
  updConfirmPassword: (confirmPassword: string) => void;
  signUp: (e:any) => void;
}

export const SignupForm = (props: ISignupFormProps) => {
  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    props.updFirstName(e.target.value);
  };
  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    props.updLastName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    props.updEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    props.updPassword(e.target.value);
  };
  const handleConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    props.updConfirmPassword(e.target.value);
  };

  return (
    <>
      {/* <div> */}
        <form
          className="login-page__section login-page__section--form"
        >
          <div className="form__input">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form__input--text"
              placeholder=" "
              onChange={handleFirstName}
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
              onChange={handleLastName}
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
              onChange={handleEmail}
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
              onChange={handlePassword}
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
              onChange={handleConfirm}
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
            onClick={ e => props.signUp(e)}
          />
          </div>
        </form>
      {/* </div> */}
    </>
  );
};
