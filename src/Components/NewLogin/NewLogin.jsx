import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import "./NewLogin.css";

function NewLogin() {
  const navigate = useNavigate();

  return (
    <div className="home-page-container">
      <Header>
        <h1 className="welcome-title">בואו להיפגש בבנימין טק</h1>
      </Header>
      <div className="actions-login">
        <div className="login-headline">
          <div>
            <b>התחברות</b>
          </div>
        </div>
        <div className="login-button" onClick={() => navigate("/login/sms")}>
          <p>
            <b>כניסה לחשבון שלך</b>
          </p>
        </div>
        <div className="login-button" onClick={() => navigate("/register")}>
          <p>
            <b>Google התחבר באמצעות</b>
          </p>
        </div>
        <div>
          <div className="login-link">
            <Link className="link-select-login2" to="/login/password">
              כניסה עם סיסמא
            </Link>
          </div>
          <div className="login-link">
            עדיין אין לך חשבון?
            <Link className="link-select-login2" to="/register/sms">
              <u style={{ textDecoration: "underLine" }}>להרשמה</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewLogin;
