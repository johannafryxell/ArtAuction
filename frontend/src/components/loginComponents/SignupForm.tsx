import axios from "axios";

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
  signUp: () => void;
}

export const SignupForm = (props: ISignupFormProps) => {
  return (
    <>
      <div>
        <form
          //   action="login/sign-up"
          onSubmit={props.signUp}
          className="login-page__section login-page__section--form"
        >
          <div className="form__input">
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="form__input--text"
              placeholder=" "
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
              required
            />
            <label htmlFor="confirmPassword" className="form__input--title">
              Repeat password
            </label>
          </div>
          {/* <div className="form__input"> */}
          <input type="submit" className="form__input--btn" value="Sign up" />
          {/* </div> */}
        </form>
      </div>
    </>
  );
};
