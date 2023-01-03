export function SignupForm() {
  return (
    <>
      <div>
        <form
          action="art/login/sign-up"
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
}
