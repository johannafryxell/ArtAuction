interface ILoginFormProps {
  email: string;
  password: string;
  updEmail: (email: string) => void;
  updPassword: (password: string) => void;
  logIn: (e: any) => void;
}

export const LoginForm = (props: ILoginFormProps) => {
  return (
    <>
      <div className="form">
        <form
          action="login/sign-in"
          className="login-page__section login-page__section--form"
        >
          <div className="form__input">
            <input
              type="text"
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
          {/* <div className="form__input"> */}
          <input type="submit" className="form__input--btn" value="Sign in" />
          {/* </div> */}
        </form>
        <div className="login-page__section login-page__section--registerView">
          <span className="registerView__text">Don't have an account?</span>
          <button className="registerView__btn"> Sign up</button>
        </div>
      </div>
    </>
  );
};
