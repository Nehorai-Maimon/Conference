import { observer } from "mobx-react";
import FormLogin from "./FormLogin";
// import AuthLayout from "../AuthLayout";
import "./Login.css";

function Login({ login }) {
  return (
    // <AuthLayout>
    <div className="bt-login-first">
      <div className="bt-login-div-content">
        <FormLogin />
      </div>
      {/* <button onClick={login}>התחבר</button> */}
    </div>
    // </AuthLayout>
  );
}
const LoginObserver = observer(Login);
export default LoginObserver;
