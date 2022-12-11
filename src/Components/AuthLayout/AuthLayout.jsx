import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

function AuthLayout({ children }) {
  return (
    <>
      <div className="bt-login-div-content-select">
        <div className="bt-login-div-content-select-1">
          <Link className="link-select-login2" to="/">
            sms כניסה עם
          </Link>
        </div>
        <div className="bt-login-div-content-select-2">
          <Link className="link-select-login2" to="/login">
            כניסה עם סיסמא
          </Link>
        </div>
      </div>

      {children}
    </>
  );
}

export default observer(AuthLayout);
