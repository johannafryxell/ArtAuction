import { LoginForm } from "../loginComponents/LoginForm";
import { SignupForm } from "../loginComponents/SignupForm";

export function Login() {
  return (
    <main className="login-page">
      {/* <LoginForm /> */}
      <SignupForm />
    </main>
  );
}
