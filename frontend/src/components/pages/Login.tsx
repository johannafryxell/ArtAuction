import { useState } from "react";
import { LoginForm } from "../loginComponents/LoginForm";
import { SignupForm } from "../loginComponents/SignupForm";

export function Login() {
  const [signUpView, setSignUpView] = useState(false);

  ///////////////////////
  // UPDATE FUNCTIONS //
  /////////////////////
  const updSignupView = () => {
    setSignUpView(!signUpView);
  };

  return (
    <main className="login-page">
      {signUpView ? <SignupForm /> : <LoginForm />}

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
